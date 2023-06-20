import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.js'
const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHashHistory(),
    routes,
})

export default router
