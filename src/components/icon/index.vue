<script setup lang="ts">
import { Icon } from '@arco-design/web-vue';
const props = defineProps({
  iconType: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

const IconFont = Icon.addFromIconFontCn({
  src: '/src/assets/icon/drillIcon.js',
});
</script>

<template>
  <icon-font
    :type="props.iconType"
    :size="props.size"
    :style="{ color: `${props.color}` }"
  />
</template>

<style scoped lang="scss"></style>
