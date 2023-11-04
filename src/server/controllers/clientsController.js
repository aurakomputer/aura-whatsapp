import response from '../response.js'
import * as helpers from '../helper/client.js'
import { prisma } from '../../../prisma/client.js'
import moment from 'moment'

const getList = async (req, res) => {
    const users = await prisma.client.findMany({
        where: {
            userId: req.query.userId,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    return res.json({
        rows: users,
    })
}

const action = async function (req, res) {
    let data = req.body
    const user = data.id
        ? await prisma.client.update({
              where: {
                  id: data.id,
              },
              data,
          })
        : await prisma.client.create({
              data: {
                  ...data,
              },
          })

    return response(res, 200, true, 'Menyimpan data whatsapp clients.', {
        user: user,
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

    const client = await prisma.client.findUnique({
        where: { id },
    })

    client.locked = !client.locked

    await prisma.client.update({
        where: { id },
        data: { locked: client.locked },
    })

    // Return a success response
    return response(res, 200, true, 'Mengupdate kunci client')
}

const tokensList = async function (req, res) {
    const { id } = req.params

    const tokens = await prisma.accessToken.findMany({
        where: {
            clientId: id,
        },
        select: {
            id: true,
            name: true,
            expiresAt: true,
            token: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })
    // const client = await helpers.getClientById(id)
    return res.json({
        tokens,
    })
}

function generateRandomString(length = 32) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('')
}

const tokenCreate = async function (req, res) {
    let data = {
        ...req.body,
        expiresAt: moment(req.body.expiresAt).format(),
        token: generateRandomString(40),
    }

    const user = await prisma.accessToken.create({
        data: {
            ...data,
        },
    })

    return response(res, 200, true, 'Membuat Akses token baru.', {
        user: user,
    })
}

const tokenDelete = async function (req, res) {
    try {
        const token = await prisma.accessToken.delete({
            where: {
                id: req.params.id,
            },
        })

        return response(res, 200, true, 'Menghapus Akses token.')
    } catch (error) {
        return response(res, 500, false, 'Gagal menghapus Akses token.', {
            error: error,
        })
    }
}
export { getList, action, getClient, toggleLocked, tokensList, tokenCreate, tokenDelete }