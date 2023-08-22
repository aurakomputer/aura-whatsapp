import { getSession, getChatList, isExists, sendMessage, formatPhone } from './../whatsapp.js'
import response from './../response.js'
import fs from 'fs'

const getList = (req, res) => {
    return response(res, 200, true, '', getChatList(res.locals.sessionId))
}

const send = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const receiver = formatPhone(req.body.receiver)
    let { message, reply_to, delay } = req.body

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

        if (message) {
            const message_data = {
                text: message,
            }

            messages.push(await sendMessage(session, receiver, message_data, params, delay))
        }

        // kirim pesan media
        for (const file of req.files) {
            const readedFile = fs.readFileSync(file.path)
            let message_data = {}
            if (file.mimetype.includes('image')) {
                message_data = {
                    image: readedFile,
                }
            } else if (file.mimetype.includes('video')) {
                message_data = {
                    video: readedFile,
                }
            } else if (file.mimetype.includes('audio')) {
                message_data = {
                    audio: readedFile,
                }
            } else {
                message_data = {
                    document: readedFile,
                    mimetype: file.mimetype,
                    fileName: file.originalname,
                }
            }
            //
            messages.push(await sendMessage(session, receiver, message_data))
        }

        response(res, 200, true, 'The message has been successfully sent.')
    } catch (e) {
        console.log(e)
        response(res, 500, false, 'Failed to send the message.')
    }
}

const sendBulk = async (req, res) => {
    const session = getSession(res.locals.sessionId)
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

            await sendMessage(session, receiver, message, params, delay)
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
        { errors }
    )
}

export { getList, send, sendBulk }
