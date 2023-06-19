import api from '../helpers/api.js'
import { LocalStorage } from 'quasar'
class Users {
    async login({ email, password }) {
        const response = await api.post('/users/login', {
            email,
            password,
        })

        LocalStorage.set('token', response.data.token)

        return response
    }
}

export default new Users()
