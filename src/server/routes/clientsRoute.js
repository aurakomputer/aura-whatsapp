import { Router } from 'express'
import { body, query } from 'express-validator'
import userValidator from './../middlewares/userValidator.js'
import { PrismaClient } from '@prisma/client'
import response from '../response.js'

const prisma = new PrismaClient()

const router = Router()

router.get('/all', userValidator, async function (req, res) {
    const users = await prisma.user.findMany({
        where: {
            id: {
                not: 1,
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        },
        orderBy: {
            id: 'desc',
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
    body('phone_number').notEmpty(),
    async function (req, res) {
        let data = req.body
        console.log(data)

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
                      user: {
                          connect: {
                              id: Number(data.user_id),
                          },
                      },
                  },
              })

        return response(res, 200, true, 'Menyimpan data whatsapp clients.', {
            user: user,
        })
    }
)
export default router
