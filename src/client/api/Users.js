import axios from './axios.js'

class Users {
    login({ email, password }) {
        return axios.post('/users/login', {
            email,
            password,
        })
    }
}

export default new Users()
