<template>
    <div class="lro-app">
        <Aside />
        <div class="lro-main">
            <Header />
            <Content />
        </div>
    </div>
</template>

<script setup lang="ts">
import Aside from './components/Aside/index.vue'
import Header from './components/Header/index.vue'
import Content from './components/Content/index.vue'
</script>

<style scoped lang="scss">
@include block(app) {
    @include bfc;
    display: flex;
}
@include block(main) {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>
