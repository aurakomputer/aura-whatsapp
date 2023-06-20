const routes = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [{ path: '', name: 'dashboard', component: () => import('@/pages/Dashboard.vue') }],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('@/pages/Error404.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Login.vue'),
    },
]

export default routes
