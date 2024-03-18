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
        :style="{ width: '320px', marginLeft: '16px' }"
        placeholder="请输入要搜索内容"
        allow-clear
      />
    </a-col>
    <a-col
      :span="12"
      :style="{
        display: 'flex',
        'justify-content': 'flex-end',
      }"
    >
      <a-select
        :style="{ width: '110px', marginLeft: '16px' }"
        v-model="selectValue"
      >
        <a-option>创建时间</a-option>
        <a-option>修改时间</a-option>
      </a-select>
      <a-range-picker
        @change="onChange"
        @select="onSelect"
        :style="{ width: '254px', marginLeft: '16px' }"
      />
    </a-col>
  </a-row>
  <a-table
    :data="classifyList"
    :columns="columns"
    :bordered="false"
    :style="{
      marginTop: '16px',
    }"
  >
    <template #operate="{ record }">
      <a-button type="text" @click="editClick(record)">编辑</a-button>
      <a-button type="text" status="danger">删除</a-button>
    </template>
  </a-table>
  <addEditClassify ref="addEditClassifyRef"></addEditClassify>
</template>

<script setup lang="ts">
import { TableColumnData } from '@arco-design/web-vue';
import addEditClassify from './components/addEditClassify.vue';

/**
 * 搜索
 */
const selectValue = ref<string>('创建时间');
const onChange = () => {};
const onSelect = () => {};

/**
 * 表格
 */
const columns: TableColumnData[] = [
  {
    title: '分类ID',
    dataIndex: 'classifyID',
  },
  {
    title: '分类名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'describe',
  },
  {
    title: '创建时间',
    dataIndex: 'creation_time',
  },
  {
    title: '修改时间',
    dataIndex: 'change_time',
  },
  {
    title: '关联文章ID',
    dataIndex: 'articleID',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    slotName: 'operate',
    align: 'center',
  },
];
const classifyList = ref([
  {
    classifyID: 1,
    name: '终端美化',
    describe: '改善命令行界面外观和用户体验的技术、工具或主题',
    articleID: 1,
    creation_time: '2024-03-13 21:19:54',
    change_time: '2024-03-14 21:19:54',
  },
]);

/**
 * 新增，编辑分类
 */
const addEditClassifyRef = ref();
const addClick = () => {
  addEditClassifyRef.value.openClick({ id: 0 });
};
const editClick = (record: any) => {
  addEditClassifyRef.value.openClick({ id: record.classifyID });
};
</script>

<style scoped lang="scss"></style>
