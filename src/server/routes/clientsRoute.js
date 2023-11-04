import { Router } from 'express'
import { body, query } from 'express-validator'
import * as controller from '../controllers/clientsController.js'
import userValidator from './../middlewares/userValidator.js'

const router = Router()

router.get('/all', userValidator, controller.getList)

router.post('/action', userValidator, body('name').notEmpty(), body('phoneNumber').notEmpty(), controller.action)

router.get('/:id', userValidator, controller.getClient)

router.post('/:id/toggle-locked', controller.toggleLocked)

router.get('/:id/tokens', userValidator, controller.tokensList)

router.post(
    '/:clientId/tokens/create',
    userValidator,
    body('name').notEmpty(),
    body('expiresAt').notEmpty(),
    controller.tokenCreate,
)

router.delete('/token/:id', userValidator, controller.tokenDelete)

export default router
