import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import api from '../helpers/api.js'
// import router from '../router/index.js'

export const useUserStore = defineStore('user', {
    persist: true,
    state: () => ({
        isLogin: !!LocalStorage.getItem('token'),
        detail: null,
    }),

    actions: {
        async fetchAuth() {
            const response = await api.get('/users/auth')
            if (response.success) {
                this.detail = response.data.user
            }
        },
        async fetchUser(username) {
            const response = await api.get('/users/' + username)
            return response
        },
        async logout() {
            LocalStorage.remove('token')
            // router.replace({
            //     name: 'login',
            // })
        },
        async login({ username, password }) {
            const response = await api.post('/users/login', {
                username,
                password,
            })

            if (response.success) {
                LocalStorage.set('token', response.data.token)
                this.fetchAuth()
                this.isLogin = true
            }
            return response
        },
    },
})
