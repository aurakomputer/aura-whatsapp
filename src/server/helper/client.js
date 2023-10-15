import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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
        select: clientPublicSelect,
    })

    return client
}

async function getClientByToken(token) {
    const client = await prisma.client.findUnique({
        where: {
            id: client_id,
        },
        select: clientPublicSelect,
    })

    return client
}

export { getClientById, clientPublicSelect }
