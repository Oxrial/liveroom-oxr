<template>
    <div>HOME</div>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { get } from '@/api/http'
onMounted(() => {
    get(api.getUserByUID(1004 + '')).then(res => {
        console.log(res)
    })
})
</script>

<style scoped lang="scss"></style>
