import { JSONFilePreset } from 'lowdb/node'
import { cryptPassword } from './helper/bcrypt.js'

const db = await JSONFilePreset('db.json', {
    tokens: [],
    clients: [],
    users: [
        {
            username: 'aurakom',
            password: await cryptPassword('aurakom123'),
        },
    ],
})

export default db
