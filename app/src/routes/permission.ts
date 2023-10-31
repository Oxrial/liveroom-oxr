import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
import router from './index'
import settings from '@/layout/settings'
import { useUserStore } from '@/store'
import { getToken } from '@/utils'
const resolveTitle = (ptitle: string) => (ptitle ? `${ptitle} - ${settings.title}` : `${settings.title}`)

const userStore = useUserStore()
router.beforeEach((to, _from, next) => {
    document.title = resolveTitle((to.meta.title as string) || '')
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
        }
    }

    next()
})

router.afterEach(() => NProgress.done())
