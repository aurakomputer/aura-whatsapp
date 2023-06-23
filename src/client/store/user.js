import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import api from '../helpers/api.js'
import router from '../router/index.js'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: !!LocalStorage.getItem('token'),
        detail: null,
    }),

    actions: {
        async fetchUser() {
            const response = await api.get('/users/auth')
            if (response.success) {
                this.detail = response.data.user
            }
        },
        async logout() {
            LocalStorage.remove('token')
            router.replace({
                name: 'login',
            })
        },
        async login({ email, password }) {
            const response = await api.post('/users/login', {
                email,
                password,
            })

            if (response.success) {
                LocalStorage.set('token', response.data.token)
            }

            this.fetchUser()
            this.isLogin = true

            return response
        },
    },
})
