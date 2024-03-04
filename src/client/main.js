// import './style.css'
import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'
import quasarIconSet from 'quasar/icon-set/mdi-v7'

// Import icon libraries
// import '@quasar/extras/roboto-font/roboto-font.css'
// import '@quasar/extras/mdi-v7/mdi-v7.css'
import './styles/main.scss'

// Import Quasar css
import 'quasar/src/css/index.sass'
import App from './App.vue'
// import some default components
import NoItems from './components/NoItems.vue'
import Loading from './components/Loading.vue'
import DataTable from './components/DataTable.vue'

import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

import vuelidate from './helpers/vuelidate.js'

const pinia = createPinia()
const router = createRouter({
    history: createWebHistory(),
    extendRoutes: (routes) => setupLayouts(routes),
})
const app = createApp(App)
app.use(Quasar, {
    plugins: { Notify, Dialog }, // import Quasar plugins and add here
    iconSet: quasarIconSet,
})

app.config.globalProperties.$rules = vuelidate
app.config.globalProperties.$dev = import.meta.env.DEV
app.use(pinia)
app.use(router)
app.mount('#app')
