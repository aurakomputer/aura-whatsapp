import { Router } from 'express'
import { body, query } from 'express-validator'
import userValidator from './../middlewares/userValidator.js'

import { comparePassword, cryptPassword } from '../helper/bcrypt.js'
import response from '../response.js'
import jwt from 'jsonwebtoken'
import db from '../db.js'
import oapi from '../oapi.js'
import _ from 'lodash'

const router = Router()
router.get('/auth', userValidator, async function (req, res) {
    return response(res, 200, true, 'Mengambil data user login.', {
        user: req.user,
    })
})

router.get('/all', userValidator, async function (req, res) {
    const users = _.filter(db.data.users, (user) => user.username != 'admin')

    return res.json({
        rows: users,
    })
})

router.post('/action', userValidator, body('name').notEmpty(), body('username').notEmpty(), async function (req, res) {
    let { name, username, password } = req.body
    if (password) {
        password = await cryptPassword(password)
    }

    const user = {
        name,
        username,
        password,
    }

    const userIndex = _.findIndex(db.data.users, ['username', username])
    if (userIndex >= 0) {
        db.data.users[userIndex] = user
    } else {
        db.data.users.push(user)
    }

    await db.write()

    return response(res, 200, true, 'Menyimpan data user.', {
        user: user,
    })
})

router.post(
    '/login',
    oapi.path({
        description: 'Proses Login dan dapatkan sesi akun ',
    }),
    async function (req, res) {
        // Capture the input fields
        const { username, password } = req.body

        // Ensure the input fields exists and are not empty
        if (username && password) {
            const user = _.find(db.data.users, ['username', username])

            if (!user) {
                return response(res, 200, false, 'Username Salah')
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
    },
)

router.get('/:username', userValidator, async function (req, res) {
    const { username } = req.params

    const user = _.find(db.data.users, ['username', username])

    return res.json({
        user,
    })
})
export default router
