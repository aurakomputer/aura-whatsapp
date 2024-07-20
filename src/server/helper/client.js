import db from '../db.js'
import { sessionStatus, isSessionExists } from '../whatsapp.js'

import _ from 'lodash'

const clientPublicSelect = {
    id: true,
    name: true,
    phoneNumber: true,
}

async function getClientById(client_id) {
    const client = _.find(db.data.clients, ['id', client_id])

    // mengambil data apakah session tersedia atau tidak
    const state = isSessionExists(client_id) ? sessionStatus(client_id) : false
    return {
        ...client,
        connected: state,
    }
}

async function getClientByToken(token) {
    const client = _.find(db.data.clients, ['token', token])

    return client
}

export { getClientById, clientPublicSelect, getClientByToken }
