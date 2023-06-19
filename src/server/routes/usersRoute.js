import { Router } from 'express'
import { body, query } from 'express-validator'
import { comparePassword } from '../helper/bcrypt.js'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const router = Router()
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
            return res.json({
                status: false,
                message: 'Incorect Username',
            })
            return
        }

        if (await comparePassword(password, user.password)) {
            const token = jwt.sign(user, process.env.APP_KEY, { expiresIn: '1800s' })
            return res.json({
                status: true,
                message: 'Login',
                data: {
                    token: token,
                },
            })
        }
        return res.json({
            status: false,
            message: 'Incorect Password!',
        })
    } else {
        return res.json({
            status: false,
            message: 'Please enter Username and Password!',
        })
    }
})
export default router
