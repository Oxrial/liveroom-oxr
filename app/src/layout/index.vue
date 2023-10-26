<style scoped lang="scss"></style>

<template>
    <div>
        <Aside />
        <div>
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
