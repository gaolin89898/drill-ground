<template>
  <h3>新建文章</h3>
  <a-row>
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
      <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </div>
    </a-col>
    <a-col :span="12"></a-col>
  </a-row>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
const form = {};
const mode = ref('default');
const editorRef = ref();
const toolbarConfig = ref({});

const valueHtml = ref('<p>hello</p>');
const editorConfig = { placeholder: '请输入内容...' };
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>
<style lang="scss" scoped></style>
