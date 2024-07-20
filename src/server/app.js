import hot from 'nodejs-hmr'
import express from 'express'
import session from 'express-session'
import nodeCleanup from 'node-cleanup'
import routes from './routes.js'
import { init, cleanup } from './whatsapp.js'
import cors from 'cors'
import endPoints from 'express-list-endpoints'
import ViteExpress from 'vite-express'
import oapi from './oapi.js'

hot.default.run()
const app = express()

const host = process.env.HOST || undefined
const port = parseInt(process.env.PORT ?? 8000)
app.use(oapi)

app.use(
    session({
        secret: process.env.APP_KEY ?? '',
        resave: true,
        saveUninitialized: true,
    }),
)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)
app.get(
    '/routes',
    oapi.path({
        description: 'Daftar api route pada aplikasi',
    }),
    (req, res) => {
        res.status(200).send(endPoints(app))
    },
)
app.use('/swaggerui', oapi.swaggerui())
const listenerCallback = () => {
    init()
    console.log(`Server is listening on http://${host ? host : 'localhost'}:${port}`)
}

let server
if (host) {
    server = app.listen(port, host, listenerCallback)
} else {
    server = app.listen(port, listenerCallback)
}

ViteExpress.bind(app, server)

nodeCleanup(cleanup)

export default app
