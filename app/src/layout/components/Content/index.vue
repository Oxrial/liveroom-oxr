<template>
    <div class="lro-content">
        <router-view />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@include block(content) {
    flex: 1;
    overflow: auto;
    background-color: #99999920;
    & > :first-child {
        background-color: #fff;
        margin: 1.25rem 1.25rem 0 1.25rem;
    }
}
</style>
