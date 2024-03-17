<template>
  <a-row>
    <a-col :span="12">
      <a-button type="primary">
        <template #icon>
          <icon-plus />
        </template>
        新增标签
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
    :columns="columns"
    :bordered="false"
    :style="{
      marginTop: '16px',
    }"
    :data="tagList"
  ></a-table>
</template>

<script setup lang="ts">
const columns = [
  {
    title: '标签ID',
    dataIndex: 'tagID',
  },
  {
    title: '标签名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'describe',
  },
  {
    title: '关联文章ID',
    dataIndex: 'articleID',
  },
  {
    title: '创建时间',
    dataIndex: 'creation_time',
  },
  {
    title: '修改时间',
    dataIndex: 'change_time',
  },
];

const tagList = ref([
  {
    tagID: 1,
    name: '终端美化',
    describe: '改善命令行界面外观和用户体验的技术、工具或主题',
    articleID: 1,
    creation_time: '2024-03-13 21:19:54',
    change_time: '2024-03-14 21:19:54',
  },
]);
const selectValue = ref<string>('创建时间');
</script>

<style scoped lang="scss">
.ll {
  display: flex;
  justify-content: flex-end;
}
</style>
