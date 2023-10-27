import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const routes: RouteRecordRaw[] = [
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
    routes
})
NProgress.configure({ showSpinner: false })
router.beforeEach((_, _from, next) => {
    NProgress.start()
    setTimeout(() => next(), 500)
})

router.afterEach(() => NProgress.done())
export default router
