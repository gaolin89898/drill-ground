<template>
  <a-layout class="layout">
    <layoutHeader></layoutHeader>
    <layoutContent></layoutContent>
<!--    <layoutFooter></layoutFooter>-->
  </a-layout>
</template>

<script lang="ts" setup>
import layoutHeader from '@/LayOut/layOutHeader/index.vue';
import layoutContent from '@/LayOut/layoutContent/index.vue';
// import layoutFooter from '@/LayOut/layOutFooter/index.vue';
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
