import { Router } from 'express'
import { body, query } from 'express-validator'
import { comparePassword } from '../helper/bcrypt.js'
import { PrismaClient } from '@prisma/client'
import response from '../response.js'
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
            return response(res, 200, false, 'Email Salah')
        }

        if (await comparePassword(password, user.password)) {
            const token = jwt.sign(user, process.env.APP_KEY, { expiresIn: '1800s' })
            return response(res, 200, false, 'Login', {
                token: token,
            })
        }
        return response(res, 200, false, 'Password Salah')
    } else {
        return response(res, 200, false, 'Tolong Masukan Username dan Password')
    }
})
export default router
