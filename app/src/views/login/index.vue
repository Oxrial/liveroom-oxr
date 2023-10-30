<template>
    <a-button danger @click="login">Login</a-button>
</template>

<script setup lang="ts">
import api from '@/api'
import {  post } from '@/api/http'

const login = () => {
    post(api.login, {
        uname: 'aya',
        password: 'aya'
    }).then(res => {
        console.log('🚀 ~ file: index.vue:13 ~ login ~ res>>> :', res)
    })
}
</script>

<style scoped lang="scss"></style>
