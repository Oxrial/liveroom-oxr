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
        path: '/404',
        component: () => import('@/views/error/404.vue'),
        meta: { hidden: true }
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            layout: '--NONE--',
            hidden: true
        }
    },
    {
        name: 'Home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页',
            svg: 'shou_ye',
            color: '#2d8cf0'
        }
    },
    {
        name: 'User',
        path: '/user',
        component: () => import('@/views/user/index.vue'),
        meta: {
            title: '用户',
            icon: 'UserOutlined'
        }
    },
    {
        path: '/test',
        redirect: '/test/index',
        meta: {
            title: '测试'
        },
        children: [
            {
                name: 'TestIndex',
                path: 'index',
                component: () => import('@/views/test/index.vue'),
                meta: {
                    title: '用户'
                }
            },
            {
                name: 'TestIndex1',
                path: 'index1',
                component: () => import('@/views/test/index1.vue'),
                meta: {
                    title: '用户1'
                }
            }
        ]
    },
    {
        path: '/role',
        redirect: '/role/index',
        meta: {
            title: '角色'
        },
        children: [
            {
                name: 'RoleIndex',
                path: 'index',
                component: () => import('@/views/role/index.vue'),
                meta: {
                    title: '角色'
                }
            },
            {
                name: 'RoleIndex1',
                path: 'index1',
                component: () => import('@/views/role/index1.vue'),
                meta: {
                    title: '角色1'
                }
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
})

export default router
