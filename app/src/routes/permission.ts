import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
import router from './index'
router.beforeEach((_, _from, next) => {
    NProgress.start()
    setTimeout(() => next(), 500)
})

router.afterEach(() => NProgress.done())
