// import './style.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/mdi-v7'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import App from './App.vue'
import routes from './routes/index.js'

const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    iconSet: quasarIconSet,
})
app.use(router)
app.mount('#app')
