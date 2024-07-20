import response from '../response.js'
import * as helpers from '../helper/client.js'
import moment from 'moment'
import _ from 'lodash'
import db from '../db.js'
import { generateId } from '../helper/index.js'

const getList = async (req, res) => {
    const clients = _.filter(db.data.clients, (client) => client.username == req.query.username)

    return res.json({
        rows: clients,
    })
}

const action = async function (req, res) {
    let data = req.body

    if (!data.id) {
        data.id = generateId()
    }

    const clientIndex = _.findIndex(db.data.users, ['id', data.id])
    if (clientIndex >= 0) {
        db.data.clients[clientIndex] = data
    } else {
        db.data.clients.push(data)
    }

    db.write()

    return response(res, 200, true, 'Menyimpan data whatsapp clients.', {
        client: data,
    })
}

const getClient = async function (req, res) {
    const { id } = req.params

    const client = await helpers.getClientById(id)
    return res.json({
        client,
    })
}

const toggleLocked = async (req, res) => {
    const { id } = req.params

    const clientIndex = _.findIndex(db.data.clients, ['id', id])

    db.data.clients[clientIndex].locked = !db.data.clients[clientIndex].locked

    db.write()

    // Return a success response
    return response(res, 200, true, 'Mengupdate kunci client')
}

const tokensList = async function (req, res) {
    const { id } = req.params

    const tokens = _.filter(db.data.tokens, ['clientId', id])

    // const client = await helpers.getClientById(id)
    return res.json({
        tokens,
    })
}

const tokenCreate = async function (req, res) {
    let data = {
        ...req.body,
        id: generateId(),
        expiresAt: moment(req.body.expiresAt).format(),
        token: generateId(),
    }

    db.data.tokens.push(data)
    db.write()

    return response(res, 200, true, 'Membuat Akses token baru.', {
        token: data,
    })
}

const tokenDelete = async function (req, res) {
    try {
        const index = _.findIndex(db.data.tokens, ['id', req.params.id])

        db.data.tokens.splice(index, 1)
        db.write()

        return response(res, 200, true, 'Menghapus Akses token.')
    } catch (error) {
        return response(res, 500, false, 'Gagal menghapus Akses token.', {
            error: error,
        })
    }
}
export { getList, action, getClient, toggleLocked, tokensList, tokenCreate, tokenDelete }
