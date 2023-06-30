import { Router } from 'express'
import sessionsRoute from './routes/sessionsRoute.js'
import chatsRoute from './routes/chatsRoute.js'
import groupsRoute from './routes/groupsRoute.js'
import usersRoute from './routes/usersRoute.js'
import clientRoute from './routes/clientsRoute.js'

import response from './response.js'

const router = Router()

router.use('/sessions', sessionsRoute)
router.use('/chats', chatsRoute)
router.use('/groups', groupsRoute)
router.use('/users', usersRoute)
router.use('/clients', clientRoute)


// router.all('*', (req, res) => {
//     response(res, 404, false, 'The requested url cannot be found.')
// })

export default router
