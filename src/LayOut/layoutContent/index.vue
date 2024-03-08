<template>
  <a-card
    :style="{
      margin: '16px 0 0 16px ',
      height: 'calc(100vh - 85px)',
    }"
    :bordered="false"
  >
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-card>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
