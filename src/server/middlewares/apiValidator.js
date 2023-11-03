import { isSessionExists } from '../whatsapp.js'
import response from './../response.js'
import * as helpers from '../helper/client.js'

const validate = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return response(res, 401, false, 'Token tidak valid.')

    const client = await helpers.getClientByToken(token)
    if (!client) return response(res, 401, false, 'Token tidak valid.')

    for (const accessToken of client.accessTokens) {
        if (token == accessToken.token) {
            const now = new Date()
            if (accessToken.expiresAt < now) {
                return response(res, 401, false, 'Token kadaluarsa.')
            }
        }
    }

    req.query.id = client.id
    next()
}

export default validate
