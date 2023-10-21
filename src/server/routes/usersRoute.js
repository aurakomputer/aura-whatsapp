import { Router } from 'express'
import { body, query } from 'express-validator'
import userValidator from './../middlewares/userValidator.js'

import { comparePassword, cryptPassword } from '../helper/bcrypt.js'
import { prisma } from '../../../prisma/client.js'
import response from '../response.js'
import jwt from 'jsonwebtoken'

const router = Router()
router.get('/auth', userValidator, async function (req, res) {
    return response(res, 200, true, 'Mengambil data user login.', {
        user: req.user,
    })
})

router.get('/all', userValidator, async function (req, res) {
    const users = await prisma.user.findMany({
        where: {
            name: {
                not: 'Superadmin',
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

router.post('/action', userValidator, body('name').notEmpty(), body('email').notEmpty(), async function (req, res) {
    let data = req.body
    if (data.password) {
        data.password = await cryptPassword(data.password)
    }
    const user = data.id
        ? await prisma.user.update({
              where: {
                  id: data.id,
              },
              data,
          })
        : await prisma.user.create({
              data,
          })

    return response(res, 200, true, 'Menyimpan data user.', {
        user: user,
    })
})

router.post('/login', async function (req, res) {
    // Capture the input fields
    const { email, password } = req.body

    // Ensure the input fields exists and are not empty
    if (email && password) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            return response(res, 200, false, 'Email Salah')
        }

        if (await comparePassword(password, user.password)) {
            const token = jwt.sign(user, process.env.APP_KEY, { expiresIn: '48h' })
            return response(res, 200, true, 'Login', {
                token: token,
            })
        }
        return response(res, 200, false, 'Password Salah')
    } else {
        return response(res, 200, false, 'Tolong Masukan Username dan Password')
    }
})

router.get('/:id', userValidator, async function (req, res) {
    const { id } = req.params

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            password: false,
        },
    })

    return res.json({
        user,
    })
})
export default router
