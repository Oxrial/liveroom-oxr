<template>
    <a-button danger @click="login">Login</a-button>
</template>

<script setup lang="ts">
const login = () => {
    const res = fetch('/api').then(res => res.json())
    console.log(res)
}
</script>

<style scoped lang="scss"></style>
