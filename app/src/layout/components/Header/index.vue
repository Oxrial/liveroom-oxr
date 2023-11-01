<template>
    <div class="lro-header">
        <div class="lro-header-left">
            <Hamburger :is-active="isActive" @toggle="toggleActive" />
        </div>
        <div class="lro-header-right">
            <a-dropdown>
                <span class="ant-dropdown-link">
                    <!-- <a-avatar size="small" :src="userStore.avatar" /> -->
                    <span>T</span>
                    <span>{{ userStore.getUser()?.uname }}</span>
                </span>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="1" @click="logout">退出登录</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import Hamburger from './Hamburger/index.vue'
import { useUserStore, useSettingStore } from '@/store'
const userStore = useUserStore()
const settingStore = useSettingStore()
const router = useRouter()
const route = useRoute()
const isActive = ref(false)
const toggleActive = () => {
    isActive.value = !isActive.value
}
const logout = () => {
    userStore.logout().then(() => {
        settingStore.clearSide()
        router.push(`/login?redirect=${route.fullPath}`)
    })
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
@include block(header) {
    height: $headerHeight;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
</style>
