import { Router } from 'express'
import cors from './cors.js'

import sessionsRoute from './routes/sessionsRoute.js'
import chatsRoute from './routes/chatsRoute.js'
import apiRoute from './routes/apiRoute.js'
import groupsRoute from './routes/groupsRoute.js'
import usersRoute from './routes/usersRoute.js'
import clientRoute from './routes/clientsRoute.js'

import response from './response.js'

const router = Router()

router.use('/sessions', cors, sessionsRoute)
router.use('/chats', cors, chatsRoute)
router.use('/groups', cors, groupsRoute)
router.use('/users', cors, usersRoute)
router.use('/clients', cors, clientRoute)
router.use('/api', apiRoute)

// router.all('*', (req, res) => {
//     response(res, 404, false, 'The requested url cannot be found.')
// })

export default router
