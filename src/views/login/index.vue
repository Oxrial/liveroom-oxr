<script setup lang="ts">
const login = () => {
    const res = fetch('/api').then(res => res.json())
    console.log(res)
}
</script>

<template>
    <a-button danger @click="login">Login</a-button>
</template>

<style scoped lang="scss"></style>
