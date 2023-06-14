const routes = [
    {
        path: '/',
        // component: () => import('layouts/MainLayout.vue'),
        // children: [
        //     { path: '', component: () => import('pages/Dashboard.vue') },
        //     { path: '/Dashboard2', component: () => import('pages/Dashboard2.vue') },
        //     { path: '/Profile', component: () => import('pages/UserProfile.vue') },
        //     { path: '/Map', component: () => import('pages/Map.vue') },
        //     { path: '/MapMarker', component: () => import('pages/MapMarker.vue') },
        //     { path: '/TreeTable', component: () => import('pages/TreeTable.vue') },
        //     { path: '/StreetView', component: () => import('pages/StreetView.vue') },
        //     { path: '/Cards', component: () => import('pages/Cards.vue') },
        //     { path: '/Tables', component: () => import('pages/Tables.vue') },
        //     { path: '/Contact', component: () => import('pages/Contact.vue') },
        //     { path: '/Checkout', component: () => import('pages/Checkout.vue') },
        //     { path: '/Ecommerce', component: () => import('pages/ProductCatalogues.vue') },
        //     { path: '/Pagination', component: () => import('pages/Pagination.vue') },
        //     { path: '/Charts', component: () => import('pages/Charts.vue') },
        //     { path: '/Calendar', component: () => import('pages/Calendar.vue') },
        //     { path: '/Directory', component: () => import('pages/Directory.vue') },
        //     { path: '/Footer', component: () => import('pages/Footer.vue') },
        //     { path: '/CardHeader', component: () => import('pages/CardHeader.vue') },
        //
        //     // Not completed yet
        //     // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
        // ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('@/pages/Error404.vue'),
    },
    {
        path: '/login',
        component: () => import('@/pages/Login.vue'),
    },
]

export default routes
