import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'normalize.css'
// import 'ant-design-vue/dist/reset.css'
import '@/routes/permission'
import 'virtual:svg-icons-register'
import * as Icons from '@ant-design/icons-vue'

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import { getPublicKey } from '@/utils'
const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.use(pinia).use(router)
router.isReady().then(() => app.mount('#app'))
for (const iconName in Icons) {
    app.component(iconName, Icons[iconName as keyof typeof Icons])
}
getPublicKey()
