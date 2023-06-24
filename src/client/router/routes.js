const routes = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            { path: 'dashboard', name: 'dashboard', component: () => import('@/pages/Dashboard.vue') },
            { path: 'users', name: 'users', component: () => import('@/pages/Users.vue') },
            { path: 'users/:id', name: 'users.detail', component: () => import('@/pages/UsersDetail.vue') },
        ],
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
