import jwt from 'jsonwebtoken'
import response from './../response.js'

function validate(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return response(res, 401, false, 'Sesi login tidak falid.')
    jwt.verify(token, process.env.APP_KEY, (err, user) => {
        console.log(err)
        if (err) return response(res, 401, false, 'Sesi login tidak falid.')
        req.user = user
        next()
    })
}

export default validate
