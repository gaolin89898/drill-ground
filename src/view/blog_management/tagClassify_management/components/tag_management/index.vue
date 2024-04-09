<template>
  <a-row>
    <a-col :span="12">
      <a-button type="primary" @click="addClick">
        <template #icon>
          <icon-plus />
        </template>
        新增标签
      </a-button>
      <a-input
        v-model="tagName"
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
    <template #tagName="{ record }">
      <a-tag color="arcoblue">{{ record.tagName }}</a-tag>
    </template>
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
  <addEditTag ref="addEditTagRef" @refresh="refresh"></addEditTag>
</template>

<script setup lang="ts">
import { Message, TableColumnData } from '@arco-design/web-vue';
import addEditTag from './components/addEditTag.vue';
import { tagList, deleteTag } from '@/api/tag/index';
import dayjs from 'dayjs';

/**
 * 表格
 */
const columns: TableColumnData[] = [
  {
    title: '标签名称',
    dataIndex: 'tagName',
    slotName: 'tagName',
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

const tagName = ref<string>('');

const tagData = async () => {
  await tagList({ tagName: tagName.value }).then((res) => {
    list.value = res.data.data;
  });
};
/**
 * 新增,编辑 标签
 */
const addEditTagRef = ref();
const addClick = () => {
  addEditTagRef.value.openClick({ id: '' });
};
const editClick = (record: any) => {
  addEditTagRef.value.openClick({ id: record._id });
};

/**
 * 删除标签
 */
const delBtn = async (record: any) => {
  await deleteTag(record._id)
    .then(() => {
      Message.success('删除标签成功');
      tagData();
    })
    .catch((error: any) => {
      Message.error(error.msg);
    });
};

/**
 * 查询
 */
const nameChange = () => {
  tagData();
};

const refresh = () => {
  tagData();
};
onMounted(() => {
  tagData();
});
</script>

<style scoped lang="scss"></style>
