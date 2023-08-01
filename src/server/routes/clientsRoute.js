import { Router } from 'express'
import { body, query } from 'express-validator'
import userValidator from './../middlewares/userValidator.js'
import { PrismaClient } from '@prisma/client'
import response from '../response.js'

const prisma = new PrismaClient()

const router = Router()

const clientPublicSelect = {
    id: true,
    name: true,
    phoneNumber: true,
}
router.get('/all', userValidator, async function (req, res) {
    const users = await prisma.client.findMany({
        where: {
            userId: Number(req.query.userId),
        },
        select: clientPublicSelect,
        orderBy: {
            createdAt: 'asc',
        },
    })

    return res.json({
        rows: users,
    })
})

router.post(
    '/action',
    userValidator,
    body('name').notEmpty(),
    body('phoneNumber').notEmpty(),
    async function (req, res) {
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
)

router.get('/:id', userValidator, async function (req, res) {
    const { id } = req.params

    const client = await prisma.client.findUnique({
        where: {
            id: id,
        },
        select: clientPublicSelect,
    })

    return res.json({
        client,
    })
})

export default router
