<template>
    <svg :style="{ width, height }">
        <!-- xlink:href 是使用哪个svg的图标 fill是更改图标的颜色 -->
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
type SvgIconType = {
    width?: string
    height?: string
    color?: string
    prefix?: string
    name: string
}
withDefaults(defineProps<SvgIconType>(), {
    width: '14px',
    height: '14px',
    color: '#333',
    prefix: '#icon-',
    name: ''
})
</script>

<style lang="scss" scoped></style>
