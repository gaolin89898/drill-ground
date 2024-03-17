<template>
  <a-row>
    <a-col :span="12">
      <a-input
        :style="{ width: '320px' }"
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
        <a-option>发布时间</a-option>
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
  ></a-table>
</template>

<script setup lang="ts">
const columns = [
  {
    title: '内容ID',
    dataIndex: 'salary',
  },
  {
    title: '标题',
    dataIndex: 'name',
  },
  {
    title: '分类',
    dataIndex: 'status',
  },
  {
    title: '删除时间',
    dataIndex: 'name',
  },
  {
    title: '删除时间',
    dataIndex: 'name',
  },
  {
    title: '恢复时间',
    dataIndex: 'name',
  },
  {
    title: '状态',
    dataIndex: 'name',
  },
];
const selectValue = ref<string>('发布时间');
</script>

<style scoped lang="scss">
.ll {
  display: flex;
  justify-content: flex-end;
}
</style>
