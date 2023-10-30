<template>
    <Empty v-if="$route.meta.layout === '--NONE--'" />
    <Layout v-else />
</template>

<script setup lang="ts">
import Layout from '@/layout/index.vue'
import Empty from '@/layout/empty.vue'
</script>

<style lang="scss">
html,
body {
    @include bfc;
}
#app {
    @include bfc;
}
</style>
