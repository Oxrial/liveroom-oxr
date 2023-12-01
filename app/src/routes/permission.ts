import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
import router from './index'
import settings from '@/layout/settings'
import { getToken } from '@/utils'
import { useUserStore } from '@/store'
const resolveTitle = (ptitle: string) => (ptitle ? `${ptitle} - ${settings.title}` : `${settings.title}`)

router.beforeEach((to, _from, next) => {
    document.title = resolveTitle((to.meta.title as string) || '')
    NProgress.start()
    if (to.path === '/login') {
        next()
    } else if (getToken()) {
        const userStore = useUserStore()
        if (!userStore.uname) userStore.loadingUser()
        next()
    } else {
        next({ path: '/login', query: { redirect: to.fullPath } })
    }
})

router.afterEach(() => NProgress.done())
