import { prisma } from '../../../prisma/client.js'
import { sessionStatus, isSessionExists } from '../whatsapp.js'

const clientPublicSelect = {
    id: true,
    name: true,
    phoneNumber: true,
}

async function getClientById(client_id) {
    const client = await prisma.client.findUnique({
        where: {
            id: client_id,
        },
    })

    // mengambil data apakah session tersedia atau tidak
    const state = isSessionExists(client_id) ? sessionStatus(client_id) : false

    return {
        ...client,
        connected: state,
    }
}

async function getClientByToken(token) {
    const client = await prisma.client.findFirst({
        where: {
            accessTokens: {
                some: {
                    token: token,
                },
            },
        },
        include: {
            accessTokens: true,
        },
    })
    return client
}

export { getClientById, clientPublicSelect, getClientByToken }
