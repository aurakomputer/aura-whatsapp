// import './style.css'
import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'
import quasarIconSet from 'quasar/icon-set/mdi-v7'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import App from './App.vue'
// import some default components
import NoItems from './components/NoItems.vue'
import Loading from './components/Loading.vue'

import { createPinia } from 'pinia'
import router from '@/router'

const pinia = createPinia()

const app = createApp(App)
app.use(Quasar, {
    plugins: { Notify, Dialog }, // import Quasar plugins and add here
    iconSet: quasarIconSet,
})
app.use(pinia)
app.use(router)
app.component('NoItems', NoItems)
app.component('Loading', Loading)
app.mount('#app')
