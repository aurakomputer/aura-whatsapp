import { isSessionExists } from '../whatsapp.js'
import response from './../response.js'
import * as helpers from '../helper/client.js'

const validate = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return response(res, 404, false, 'Token tidak valid.')
    }

    const client = await helpers.getClientById(token)
    if (!client) {
        return response(res, 404, false, 'Token tidak valid.')
    }

    req.query.id = client.id
    next()
}

export default validate
