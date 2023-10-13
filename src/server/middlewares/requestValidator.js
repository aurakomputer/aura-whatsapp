import { validationResult } from 'express-validator'
import response from './../response.js'

const validate = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)

    if (!errors.isEmpty()) {
        const error = errors['errors'][0]
        return response(res, 400, false, `Silahkan lengkapi data. ${error.msg}: ${error.path} => ${error.location}`)
    }

    next()
}

export default validate
