<template>
  <div
    :style="{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    }"
  >
    <a-input placeholder="请输入文章标题" v-model="articleName"></a-input>
    <a-trigger
      trigger="click"
      position="br"
      auto-fit-position
      :unmount-on-close="false"
      :popup-translate="[0, 10]"
      :popup-style="{
        width: '560px',
        background: '#ffffff',
      }"
      :content-style="{
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
      }"
    >
      <a-button type="primary" :style="{ 'margin-left': '15px' }">
        发布
      </a-button>
      <template #content>
        <div
          style="
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--color-neutral-3);
          "
        >
          <span style="padding-left: 15px; font-size: 15px; font-weight: bold">
            发布文章
          </span>
        </div>
        <a-form :model="form" label-align="left" style="margin-top: 15px">
          <a-form-item
            label="分类："
            :label-col-style="{ paddingLeft: '20px' }"
          >
            <a-select
              placeholder="请选择分类"
              :options="classList"
              :field-names="{
                value: '_id',
                label: 'classificationName',
              }"
              v-model="form.classID"
              :style="{ width: '400px' }"
            ></a-select>
          </a-form-item>
          <a-form-item
            label="标签："
            :label-col-style="{ paddingLeft: '20px' }"
          >
            <a-select
              multiple
              placeholder="请选择标签"
              :options="tagsList"
              :field-names="{
                value: '_id',
                label: 'tagName',
              }"
              v-model="form.tagID"
              :style="{ width: '400px' }"
            ></a-select>
          </a-form-item>
          <!-- <a-form-item
            label="文章封面："
            :label-col-style="{ paddingLeft: '20px' }"
          >
            <a-upload action="/" :fileList="[]" :show-file-list="false">
              <template #upload-button>
                <div
                  :class="`arco-upload-list-item${
                    file && file.status === 'error'
                      ? ' arco-upload-list-item-error'
                      : ''
                  }`"
                >
                  <div class="arco-upload-picture-card">
                    <div class="arco-upload-picture-card-text">
                      <IconPlus />
                    </div>
                  </div>
                </div>
              </template>
            </a-upload>
            <span style="padding-left: 10px">
              建议尺寸：192*128px(封面仅展示在首页中)
            </span>
          </a-form-item> -->
          <a-form-item
            label="编辑摘要："
            :label-col-style="{ paddingLeft: '20px' }"
          >
            <a-textarea
              :style="{
                width: '400px',
              }"
              :max-length="100"
              allow-clear
              show-word-limit
              auto-size
              v-model="form.summary"
            />
          </a-form-item>
        </a-form>
        <div
          style="
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            border-top: 1px solid var(--color-neutral-3);
          "
        >
          <a-button type="outline" style="margin-right: 15px">取消</a-button>
          <a-button type="primary" style="margin-right: 15px" @click="quding">
            确定并发布
          </a-button>
        </div>
      </template>
    </a-trigger>
  </div>
  <MdEditor
    :style="{
      width: '100%',
      marginTop: '20px',
      height: 'calc(100vh - 170px)',
    }"
    @onHtmlChanged="onHtmlChanged"
    v-model="content"
    class=""
  />
</template>
<script lang="ts" setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { tagList } from '@/api/tag/index';
import { classificationList } from '@/api/class/index';
import { addArticle } from '@/api/article/index';
import { Message } from '@arco-design/web-vue';

const articleName = ref<string>('');
const content = ref<string>('');
const form = ref({
  tagID: [],
  classID: '',
  summary: '',
});

const classList = ref<any[]>([]);
const classificationData = async () => {
  await classificationList({}).then((res) => {
    classList.value = res.data.data;
  });
};

const tagsList = ref<any[]>([]);
const tagData = async () => {
  await tagList({}).then((res) => {
    tagsList.value = res.data.data;
  });
};

const onHtmlChanged = (html: string) => {
  console.log(html);
};

const quding = async () => {
  await addArticle({
    ...form.value,
    status:'发布',
    content: content.value,
    articleName: articleName.value,
  }).then(() => {
    Message.success('添加文章成功');
  });
};

onMounted(() => {
  classificationData();
  tagData();
});
</script>
<style lang="scss" scoped></style>
