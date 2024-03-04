import axios from 'axios'
import toast from './notify'
import { LocalStorage } from 'quasar'
// import { useUserStore } from '../store/user'

const api = axios.create({})

async function report_error(text) {
    if (!import.meta.env.DEV) {
        // TODO: membuat fungsi untuk report bug ketika api error di panggil
    }
}
api.interceptors.request.use(
    function (config) {
        const token = LocalStorage.getItem('token')
        if (!!token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    },
)

// Add a response interceptor
api.interceptors.response.use(
    function (response) {
        // Do something with response data
        const { data } = response
        if (data.message) {
            toast.request(data.success, data.message)
        }
        return data
    },
    function (error) {
        if (error.response) {
            if (import.meta.env.DEV) {
                console.log('error response', error.response)
            }

            if (error.response.status === 401) {
                toast.app_error('Kamu tidak mempunyai ijin untuk melakukan tindakan')
                const user = useUserStore()
                user.logout()
            } else if (error.response.status === 402) {
                // toast.app_error(error.response.data.message);
            } else if (error.response.status === 422) {
                /**
                 * handler erro validate di laravel
                 */
                // Object.entries(error.response.data.errors).forEach(entry => {
                console.log(error.response.data.errors)
                const [key, value] = Object.entries(error.response.data.errors)[0]

                for (const item of value) {
                    toast.app_error(`${item}`)
                    break
                }
                // })
            }
        }

        return Promise.reject(error)
    },
)

export default api
