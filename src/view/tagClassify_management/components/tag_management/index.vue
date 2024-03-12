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
  ></a-table>
</template>

<script setup lang="ts">
const columns = [
  {
    title: '标签ID',
    dataIndex: 'salary',
  },
  {
    title: '标签名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'name',
  },
  {
    title: '修改时间',
    dataIndex: 'name',
  },
  {
    title: '关联文章ID',
    dataIndex: 'name',
  },
];
const selectValue = ref<string>('创建时间');
</script>

<style scoped lang="scss">
.ll {
  display: flex;
  justify-content: flex-end;
}
</style>
