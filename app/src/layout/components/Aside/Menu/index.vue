<template>
    <AMenu
        :openKeys="menuState.openKeys"
        :selectedKeys="menuState.selectedKeys"
        :inline-collapsed="!useSetting.sideIsActive"
        mode="inline"
        :theme="(settings.theme as MenuTheme)"
        @click="menuClick"
    >
        <MenuSub v-for="routeItem in (routes as Route[])" :item="routeItem"></MenuSub>
    </AMenu>
</template>

<script setup lang="ts">
import settings from '@/layout/settings'
import { useSettingStore } from '@/store'
import MenuSub from './MenuSub.vue'
import type { Route } from '@/layout/types'
import { constantRoutes } from '@/routes'
import { MenuInfo, MenuTheme } from 'ant-design-vue/es/menu/src/interface'
import { Key } from 'ant-design-vue/es/_util/type'
const routes = constantRoutes.filter(r => !r.meta?.hidden)
const useSetting = useSettingStore()
const $router = useRouter()
const $route = useRoute()

const menuState = reactive({
    selectedKeys: [$route.path] as Key[],
    openKeys: [] as Key[]
})

const menuClick = ({ key }: MenuInfo) => {
    $router.push(key as string)
}

watch(
    () => $route.fullPath,
    () => {
        menuState.selectedKeys = [$route.path]
        menuState.openKeys = [$route.matched[0].path]
    },
    {
        immediate: true
    }
)
</script>

<style lang="scss" scoped>
.ant-menu {
    line-height: unset !important;
}
</style>
