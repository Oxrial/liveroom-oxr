<template>
    <div
        class="lro-aside"
        :class="{ 'has-logo': settings.hasLogo, hide }"
        :style="{ backgroundColor: settings.themeEnums[settings.theme as MenuTheme] }"
    >
        <div class="lro-aside__logo">LOGO</div>
        <div class="lro-aside__menu">
            <Menu />
        </div>
    </div>
</template>

<script setup lang="ts">
import settings from '@/layout/settings'
import { useSettingStore } from '@/store'
import Menu from './Menu/index.vue'
import type { MenuTheme } from 'ant-design-vue'
const useSetting = useSettingStore()
const hide = computed(() => !useSetting.sideIsActive)
</script>

<style scoped lang="scss">
$sideWidth: 250px;
@include block(aside) {
    width: $sideWidth;
    height: 100%;
    transition-duration: 0.3s;
    @include elem(logo) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        color: #fff;
        background-color: #20a0ff;
        border-bottom: 1px solid #20a0ff;
    }
    @include elem(menu) {
        width: 100%;
        height: calc(100vh - 60px);
        overflow: auto;
        .ant-menu-inline-collapsed {
            transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
        }
    }

    &.hide {
        width: 80px;
        // pointer-events: none;
        transition-duration: 0.3s;
    }
}
</style>
