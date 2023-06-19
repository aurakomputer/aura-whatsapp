import api from '../helpers/api.js'

class Users {
    login({ email, password }) {
        return api.post('/users/login', {
            email,
            password,
        })
    }
}

export default new Users()
