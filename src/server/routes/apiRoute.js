import { Router } from 'express'
import { body, query } from 'express-validator'
import multer from 'multer'
import { isSessionExists, deleteSession } from './../whatsapp.js'

import requestValidator from './../middlewares/requestValidator.js'
import apiValidator from './../middlewares/apiValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'

import * as controllerChat from './../controllers/chatsController.js'
import * as controllerSession from './../controllers/sessionsController.js'

import * as controllerClient from './../controllers/clientsController.js'

import getMessages from './../controllers/getMessages.js'

const router = Router()
const upload = multer({ dest: 'uploads/' })
router.post(
    '/send',
    // body('receiver').notEmpty(),
    apiValidator,
    requestValidator,
    sessionValidator,
    upload.array('files', 100),
    controllerChat.send,
)

router.get(
    '/client',
    apiValidator,
    (req, res, next) => {
        req.params.id = res.locals.clientId
        next()
    },
    controllerClient.getClient,
)

router.post(
    '/request_qr',
    apiValidator,
    (req, res, next) => {
        const sessionId = res.locals.clientId

        if (isSessionExists(sessionId)) {
            deleteSession(sessionId)
        }

        req.body.id = sessionId
        next()
    },
    controllerSession.add,
)

router.delete(
    '/logout',
    apiValidator,
    (req, res, next) => {
        req.params.id = res.locals.clientId
        next()
    },
    sessionValidator,
    controllerSession.del,
)

export default router
