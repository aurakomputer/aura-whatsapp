import { prisma } from '../../../prisma/client.js'

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

    return client
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
