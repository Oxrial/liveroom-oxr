import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'normalize.css'
// import 'ant-design-vue/dist/reset.css'
import '@/routes/permission'

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.use(router).use(pinia)
router.isReady().then(() => app.mount('#app'))
