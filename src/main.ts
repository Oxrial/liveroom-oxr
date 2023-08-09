import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'normalize.css'
// import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(router)
router.isReady().then(() => app.mount('#app'))
