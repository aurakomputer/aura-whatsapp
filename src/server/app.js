import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import nodeCleanup from 'node-cleanup'
import routes from './routes.js'
import { init, cleanup } from './whatsapp.js'
import cors from 'cors'
import endPoints from 'express-list-endpoints'

import ViteExpress from 'vite-express'

const app = express()

const host = process.env.HOST || undefined
const port = parseInt(process.env.PORT ?? 8000)
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

app.get('/routes', (req, res) => {
    res.status(200).send(endPoints(app))
})

const listenerCallback = () => {
    init()
    console.log(`Server is listening on http://${host ? host : 'localhost'}:${port}`)
}

let server
// if (host) {
//     server = ViteExpress.listen(app, port, host, listenerCallback)
// } else {
server = ViteExpress.listen(app, port, listenerCallback)
// }

nodeCleanup(cleanup)

export default app
