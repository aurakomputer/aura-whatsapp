import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import api from '../helpers/api.js'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: !!LocalStorage.getItem('token'),
        user: null,
    }),

    actions: {
        async fetchUser() {
            const user = await api.get('/users/auth')
            this.user = user
        },
        async login({ email, password }) {
            const response = await api.post('/users/login', {
                email,
                password,
            })

            if (response.status) {
                LocalStorage.set('token', response.data.token)
            }

            this.fetchUser()
            this.isLogin = true

            return response
        },
    },
})
