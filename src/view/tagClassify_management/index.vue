<template>
  <a-tabs>
    <a-tab-pane key="1">
      <template #title>
        <icon-attachment />
        标签管理
      </template>
      <tag-management></tag-management>
    </a-tab-pane>
    <a-tab-pane key="2">
      <template #title>
        <icon-empty />
        分类管理
      </template>
      <classify-management></classify-management>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import tagManagement from '@/view/tagClassify_management/components/tag_management/index.vue';
import classifyManagement from '@/view/tagClassify_management/components/classify_management/index.vue';
</script>

<style scoped lang="scss"></style>
