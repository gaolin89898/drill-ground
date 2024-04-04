<template>
  <a-row>
    <a-col :span="12">
      <a-button type="primary" @click="addClick">
        <template #icon>
          <icon-plus />
        </template>
        新增分类
      </a-button>
      <a-input
        v-model="classificationName"
        :style="{ width: '320px', marginLeft: '16px' }"
        placeholder="请输入要搜索内容"
        allow-clear
        @change="nameChange"
      />
    </a-col>
  </a-row>
  <a-table
    :data="list"
    :columns="columns"
    :bordered="false"
    :pagination="false"
    :style="{
      marginTop: '16px',
    }"
  >
    <template #describe="{ record }">
      <span v-if="record.describe">{{ record.describe }}</span>
      <span v-else>--</span>
    </template>
    <template #createAt="{ record }">
      {{ dayjs(record.createAt).format('YYYY-MM-DD HH:mm:ss') }}
    </template>
    <template #operate="{ record }">
      <a-button type="text" @click="editClick(record)">编辑</a-button>
      <a-button type="text" status="danger" @click="delBtn(record)">
        删除
      </a-button>
    </template>
  </a-table>
  <addEditclassification ref="addEditclassificationRef" @refresh="refresh"></addEditclassification>
</template>

<script setup lang="ts">
import { Message, TableColumnData } from '@arco-design/web-vue';
import addEditclassification from './components/addEditClass.vue';
import { classificationList, deleteClassification } from '@/api/class/index';
import dayjs from 'dayjs';

/**
 * 表格
 */
const columns: TableColumnData[] = [
  {
    title: '分类名称',
    dataIndex: 'classificationName',
  },
  {
    title: '描述',
    dataIndex: 'describe',
    slotName: 'describe',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    slotName: 'createAt',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    slotName: 'operate',
    align: 'center',
  },
];
const list = ref<any[]>([]);

const classificationName = ref<string>('');

const classificationData = async () => {
  await classificationList({ classificationName: classificationName.value }).then((res) => {
    list.value = res.data.data;
  });
};
/**
 * 新增,编辑 分类
 */
const addEditclassificationRef = ref();
const addClick = () => {
  addEditclassificationRef.value.openClick({ id: '' });
};
const editClick = (record: any) => {
  addEditclassificationRef.value.openClick({ id: record._id });
};

/**
 * 删除分类
 */
const delBtn = async (record: any) => {
  await deleteClassification(record._id)
    .then(() => {
      Message.success('删除分类成功');
      classificationData();
    })
    .catch((error: any) => {
      Message.error(error.msg);
    });
};

/**
 * 查询
 */
const nameChange = () => {
  classificationData();
};

const refresh = () => {
  classificationData();
};
onMounted(() => {
  classificationData();
});
</script>

<style scoped lang="scss"></style>
