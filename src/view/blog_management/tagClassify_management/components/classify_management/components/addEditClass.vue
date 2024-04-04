<template>
  <a-modal
    v-model:visible="visible"
    :width="500"
    :footer="false"
    :hide-title="true"
    simple
    :modal-style="{
      padding: '30px',
    }"
    @before-close="beforeClose"
  >
    <span style="font-size: 20px">
      {{ id == '' ? '新增分类' : '编辑分类' }}
    </span>
    <a-form
      :model="form"
      ref="formRef"
      style="margin-top: 20px"
      @submit="handleSubmit"
    >
      <a-form-item
        field="classificationName"
        label="分类名称："
        :rules="[{ required: true, message: '请输入分类名称' }]"
      >
        <a-input
          v-model="form.classificationName"
          placeholder="请输入分类名称"
        />
      </a-form-item>
      <a-form-item field="describe" label="分类描述：">
        <a-input v-model="form.describe" placeholder="请输入分类描述" />
      </a-form-item>
      <a-form-item
        :style="{
          'margin-bottom': 0,
        }"
      >
        <div style="width: 100%; display: flex; justify-content: flex-end">
          <a-button style="margin-right: 15px">取消</a-button>
          <a-button type="primary" html-type="submit">确定</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  addClassification,
  classificationOne,
  editClassification,
} from '@/api/class';
import { Message, ValidatedError } from '@arco-design/web-vue';

/**
 * 打开弹窗
 */
const visible = ref<boolean>(false);
const formRef = ref();
const id = ref<string>('');
const openClick = async (data: { id: string }) => {
  visible.value = true;
  if (data.id !== '') {
    await classificationOne(data.id).then((res) => {
      form.value = {
        classificationName: res.data.data.classificationName,
        describe: res.data.data.describe,
      };
    });
  }
  id.value = data.id;
};

/**
 * 表单
 */
const form = ref({
  classificationName: '',
  describe: '',
});

/**
 * 确定
 */
const handleSubmit = () => {
  formRef.value.validate(
    async (
      callback: (errors: undefined | Record<string, ValidatedError>) => void,
    ) => {
      if (!callback) {
        if (id.value == '') {
          await addClassification(form.value)
            .then(() => {
              Message.success('添加分类成功');
              visible.value = false;
              emits('refresh');
            })
            .catch((error: any) => {
              Message.error(error.msg);
            });
        } else {
          await editClassification({ _id: id.value, ...form.value })
            .then(() => {
              Message.success('编辑分类成功');
              visible.value = false;
              emits('refresh');
            })
            .catch((error: any) => {
              Message.error(error.msg);
            });
        }
      }
    },
  );
};

const beforeClose = () => {
  formRef.value.resetFields();
  id.value = '';
};

defineExpose({
  openClick,
});

const emits = defineEmits(['refresh']);
</script>

<style lang="scss" scoped></style>
