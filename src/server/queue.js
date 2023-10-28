import { Queue } from 'bullmq'

const sendMessageQueue = new Queue('sendMessage')

export { sendMessageQueue }
