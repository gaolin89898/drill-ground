<template>
  <a-modal v-model:visible="visible">
    <template #title>{{ id == 0 ? '新增分类' : '编辑分类' }}</template>
    <a-form :model="form">
      <a-form-item field="name" label="分类名称：">
        <a-input v-model="form.name" placeholder="请输入分类名称" />
      </a-form-item>
      <a-form-item field="describe" label="分类描述：">
        <a-input v-model="form.describe" placeholder="请输入分类描述" />
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
    name:'',
    describe:''
});

defineExpose({
  openClick,
});
</script>

<style lang="scss" scoped></style>
