<template>
    <div class="lro-header">
        <div class="lro-header__left">
            <Hamburger :is-active="settingStore.sideIsActive" @toggle="settingStore.toggleSide" />
        </div>
        <div class="lro-header__right">
            <ADropdown>
                <span>
                    <AAvatar :size="40">{{ userStore.uname?.substring(0, 2).toLocaleUpperCase() }}</AAvatar>
                    <span> {{ userStore.uname }}</span>
                </span>
                <template #overlay>
                    <AMenu>
                        <AMenuItem key="1" @click="logout">退出登录</AMenuItem>
                    </AMenu>
                </template>
            </ADropdown>
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
    @include elem(right) {
        .ant-dropdown-trigger {
            display: flex;
            align-items: center;
            .ant-avatar {
                margin-right: 10px;
            }
        }
    }
}
</style>
