<template>
  <a-modal v-model:visible="visible">
    <template #title>{{ id == 0 ? '新增标签' : '编辑标签' }}</template>
    <a-form :model="form">
      <a-form-item field="name" label="标签名称：">
        <a-input-tag
          :default-value="[]"
          placeholder="请输入标签名称"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="describe" label="标签描述：">
        <a-input placeholder="请输入标签描述" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

/**
 * 打开弹窗
 */
const visible = ref<boolean>(false);
const id = ref<number>(0);
const openClick = (data: { id: number }) => {
  visible.value = true;
  id.value = data.id;
};

/**
 * 表单
 */
const form = ref({
  name: [],
  describe: '',
});

defineExpose({
  openClick,
});
</script>

<style lang="scss" scoped></style>
