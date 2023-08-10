import { Router } from 'express'
import { body } from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/sessionsController.js'
import userValidator from './../middlewares/userValidator.js'

const router = Router()

router.get('/find/:id', userValidator, sessionValidator, controller.find)

router.get('/status/:id', userValidator, sessionValidator, controller.status)

router.post('/add', body('id').notEmpty(), userValidator, requestValidator, controller.add)

router.delete('/delete/:id', userValidator, sessionValidator, controller.del)

export default router
