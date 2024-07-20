import crypto from 'crypto'

function generateId(length = 16) {
    return crypto.randomBytes(length).toString('hex')
}

export { generateId }
