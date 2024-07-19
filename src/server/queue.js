import BetterQueue from 'better-queue'

import { getSession, getChatList, sendMessage as sendMessageWa, isExists, formatPhone } from './../server/whatsapp.js'

const sendMessageQueue = new BetterQueue(async function (input) {
    let { sessionId, receiver, message_data, params, delayMs } = input
    const session = getSession(sessionId)

    // lakukan read file kedalam buffer untuk file yang akan di kirim menggunakan wa
    for (const type of ['image', 'video', 'audio', 'document']) {
        if (message_data[type]) {
            message_data[type] = fs.readFileSync(message_data[type])
        }
    }

    await sendMessageWa(session, receiver, message_data, params, delayMs)
})

export { sendMessageQueue }
