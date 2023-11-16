<template>
    <div>HOME</div>
    <div>{{ u }}</div>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { get } from '@/api/http'
import { useUserStore } from '@/store'
const u = ref()
const userStore = useUserStore()
onMounted(() => {
    console.log('🚀 ~ file: index.vue:14 ~ get ~ userStore:', userStore.getUser())
    get(api.getUserByUID(userStore.getUser().uid + '')).then(res => {
        u.value = res
    })
})
</script>

<style scoped lang="scss"></style>
