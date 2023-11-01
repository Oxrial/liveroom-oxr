<template>
    <div class="lro-aside" :class="{ 'has-logo': settings.hasLogo, hide }">
        <div class="lro-aside__logo">LOGO</div>
        <div class="lro-aside__menu">
            <div v-for="i in 100">{{ i }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import settings from '@/layout/settings'
import { useSettingStore } from '@/store'
const useSetting = useSettingStore()
const hide = computed(() => !useSetting.sideIsActive)
</script>

<style scoped lang="scss">
$sideWidth: 250px;
@include block(aside) {
    width: $sideWidth;
    height: 100%;
    background-color: antiquewhite;
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
        height: calc(100vh - 60px);
        overflow: auto;
    }

    &.hide {
        width: 54px;
        pointer-events: none;
        transition-duration: 0.3s;
    }
}
</style>
