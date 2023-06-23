import { Router } from 'express'
import { body, query } from 'express-validator'
import userValidator from './../middlewares/userValidator.js'

import { comparePassword } from '../helper/bcrypt.js'
import { PrismaClient } from '@prisma/client'
import response from '../response.js'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const router = Router()
router.get('/auth', userValidator, async function (req, res) {
    return response(res, 200, true, 'Mengambil data user login.', {
        user: req.user,
    })
})

router.get('/all', userValidator, async function (req, res) {
    const users = await prisma.user.findMany()

    return res.json({
        rows: users,
    })
})

router.post('/action', userValidator, body('name').notEmpty(), body('email').notEmpty(), async function (req, res) {
    // const { email, name, password } = req.body

    console.log(req.body)
    const user = await prisma.user.upsert({
        where: {
            id: req.body.id,
            email: req.body.email,
        },
        update: req.body,
        create: req.body,
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
export default router
