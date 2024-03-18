<template>
  <a-row style="margin-top: 10px">
    <a-col :span="9">
      <a-form :model="form" label-align="left">
        <a-form-item label="文章名称：">
          <a-input
            placeholder="请输入文章名称"
            :style="{ width: '320px' }"
          ></a-input>
        </a-form-item>
        <a-form-item label="文章分类：">
          <a-select :style="{ width: '320px' }" placeholder="请选择文章分类">
            <a-option>Beijing</a-option>
            <a-option>Shanghai</a-option>
            <a-option>Guangzhou</a-option>
            <a-option disabled>Disabled</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="文章标签：">
          <a-select
            :style="{ width: '320px' }"
            placeholder="请选择文章标签"
            multiple
          >
            <a-option>Beijing</a-option>
            <a-option>Shanghai</a-option>
            <a-option>Guangzhou</a-option>
            <a-option disabled>Disabled</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="发布时间：">
          <a-date-picker style="width: 320px" />
        </a-form-item>
      </a-form>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" title="富文本编辑器">
          <QuillEditor
            theme="snow"
            :style="{
              width: '100%',
              height: '480px',
            }"
          />
        </a-tab-pane>
        <a-tab-pane key="2" title="MarkDown编辑器">
          Content of Tab Panel 2
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #title>Notion风格</template>
          Content of Tab Panel 3
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :span="12"></a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const form = {};
</script>
<style lang="scss" scoped></style>
