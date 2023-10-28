<template>
    <div>HOME</div>
    <div>{{ u }}</div>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { get } from '@/api/http'
const u = ref()
onMounted(() => {
    get(api.getUserByUID(1001 + '')).then(res => {
        u.value = res
    })
})
</script>

<style scoped lang="scss"></style>
