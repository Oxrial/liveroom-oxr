import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
import router from './index'
import settings from '@/layout/settings'
const resolveTitle = (ptitle: string) => (ptitle ? `${ptitle} - ${settings.title}` : `${settings.title}`)

router.beforeEach((to, _from, next) => {
    NProgress.start()

    document.title = resolveTitle((to.meta.title as string) || '')
    next()
})

router.afterEach(() => NProgress.done())
