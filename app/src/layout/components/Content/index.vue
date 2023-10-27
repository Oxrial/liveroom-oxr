<template>
  <div class="lro-content">
    <!-- <div v-for="item in  100">{{item}}</div> -->
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@include block(content){
    flex: 1;
    overflow: auto;
    background-color: #99999920;
}
</style>
