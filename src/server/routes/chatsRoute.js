import { Router } from 'express'
import { body, query } from 'express-validator'
import multer from 'multer'

import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/chatsController.js'
import getMessages from './../controllers/getMessages.js'

const router = Router()

router.get('/', query('id').notEmpty(), requestValidator, sessionValidator, controller.getList)

router.get('/:jid', query('id').notEmpty(), requestValidator, sessionValidator, getMessages)

const upload = multer({ dest: 'uploads/' })
router.post(
    '/send',
    query('id').notEmpty(),
    // body('receiver').notEmpty(),
    requestValidator,
    sessionValidator,
    upload.array('files', 100),
    controller.send
)

router.post('/send-bulk', query('id').notEmpty(), requestValidator, sessionValidator, controller.sendBulk)

export default router
