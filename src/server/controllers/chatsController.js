import { getSession, getChatList, sendMessage as sendMessageWa, isExists, formatPhone } from './../whatsapp.js'

import response from './../response.js'
import fs from 'fs'

import { sendMessageQueue } from '../queue.js'
import { prisma } from '../../../prisma/client.js'

const getList = (req, res) => {
    return response(res, 200, true, '', getChatList(res.locals.sessionId))
}

function saveMessage(clientId, receiver, message) {
    return prisma.message.create({
        data: {
            receiver: receiver,
            message: message,
            clientId: clientId,
        },
    })
}

// fungsi untuk melakukan pengiriman pesan dan menyimpan di daftar queue
const sendMessage = async (sessionId, receiver, message_data, params, delayMs = 1000) => {
    sendMessageQueue.add('message', {
        sessionId,
        receiver,
        message_data,
        params,
        delayMs,
    })
}

const send = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const sessionId = res.locals.sessionId
    const receiver = formatPhone(req.body.receiver)
    let { message: messsageText, reply_to, delay } = req.body

    await saveMessage(sessionId, receiver, messsageText)

    if (!delay) delay = 0

    try {
        const exists = await isExists(session, receiver)
        let messages = []

        if (!exists) {
            return response(res, 400, false, 'The receiver number is not exists.')
        }

        // mengambil data message yang akan di reply
        let quoted
        if (reply_to) {
            quoted = await session.store.loadMessage(receiver, reply_to)
        }

        const params = {
            quoted,
        }

        if (messsageText) {
            const message_data = {
                text: messsageText,
            }
            messages.push(message_data)
        }

        for (let index = 0; index < req.files.length; index++) {
            const file = req.files[index]

            let message_data = {}
            if (file.mimetype.includes('image')) {
                message_data = {
                    image: file.path,
                }
            } else if (file.mimetype.includes('video')) {
                message_data = {
                    video: file.path,
                }
            } else if (file.mimetype.includes('audio')) {
                message_data = {
                    audio: file.path,
                }
            } else {
                message_data = {
                    document: file.path,
                    mimetype: file.mimetype,
                    fileName: file.originalname,
                }
            }

            if (index == 0 && messsageText) {
                messages[0] = {
                    caption: messsageText,
                    ...message_data,
                }
            } else {
                messages.push(message_data)
            }
        }

        // console.log(messages)

        for (const message_data of messages) {
            await sendMessage(sessionId, receiver, message_data, params, delay)
        }

        response(res, 200, true, 'The message has been successfully sent.')
    } catch (e) {
        console.log('failed to send message', e)
        response(res, 500, false, 'Failed to send the message.')
    }
}

const sendBulk = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const sessionId = res.locals.sessionId
    const errors = []

    for (const [key, data] of req.body.entries()) {
        let { receiver, message, params, delay } = data

        if (!receiver || !message) {
            errors.push(key)

            continue
        }

        if (!delay || isNaN(delay)) {
            delay = 1000
        }

        receiver = formatPhone(receiver)

        try {
            const exists = await isExists(session, receiver)

            if (!exists) {
                errors.push(key)

                continue
            }

            await sendMessage(sessionId, receiver, message, params, delay)
        } catch {
            errors.push(key)
        }
    }

    if (errors.length === 0) {
        return response(res, 200, true, 'All messages has been successfully sent.')
    }

    const isAllFailed = errors.length === req.body.length

    response(
        res,
        isAllFailed ? 500 : 200,
        !isAllFailed,
        isAllFailed ? 'Failed to send all messages.' : 'Some messages has been successfully sent.',
        { errors },
    )
}

export { getList, send, sendBulk }
