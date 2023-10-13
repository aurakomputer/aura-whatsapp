import { Router } from 'express'
import { body, query } from 'express-validator'
import multer from 'multer'

import requestValidator from './../middlewares/requestValidator.js'
import apiValidator from './../middlewares/apiValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'

import * as controller from './../controllers/chatsController.js'
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
    controller.send,
)

export default router
