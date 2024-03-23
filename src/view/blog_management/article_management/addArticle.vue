<template>
  <div
    :style="{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    }"
  >
    <a-input placeholder="请输入文章标题"></a-input>
    <a-trigger
      trigger="click"
      position="bottom"
      auto-fit-position
      :unmount-on-close="false"
      :popup-style="{
        width: '560px',
        background: '#ffffff',
      }"
    >
      <a-button type="primary" :style="{ 'margin-left': '15px' }">
        保存
      </a-button>
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
  </div>
  <MdEditor
    :style="{
      width: '100%',
      marginTop: '20px',
      height: 'calc(100vh - 170px)',
    }"
    v-model="text"
    class=""
  />
</template>
<script lang="ts" setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('');

onMounted(() => {});
</script>
<style lang="scss" scoped></style>
