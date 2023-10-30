import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import 'nprogress/nprogress.css'

// static
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
        meta: { hidden: true }
    },
    {
        path: '/home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            layout: '--NONE--'
        }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
})

export default router
