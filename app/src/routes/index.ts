import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import 'nprogress/nprogress.css'

// static
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
})

export default router
