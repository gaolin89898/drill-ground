<template>
  <a-breadcrumb :max-count="6">
    <a-breadcrumb-item style="cursor: pointer" @click="breadcrumb('')">
      根目录
    </a-breadcrumb-item>
    <a-breadcrumb-item
      style="cursor: pointer"
      v-for="item in targetPath.split('/')"
      @click="breadcrumb(item)"
    >
      {{ item }}
    </a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :columns="columns"
    :data="tableData"
    :bordered="false"
    :style="{
      marginTop: '15px',
      marginBottom: '15px',
    }"
    :pagination="false"
    @row-click="rowClick"
    :scroll="scroll"
    :scrollbar="scrollbar"
  >
    <template #empty>
      <div class="empty">
        <div class="emptyText">暂无文件</div>
        <div class="emptyBnts">
          <div @click="AddFile">
            <img src="@/assets/img/addFlies.svg" alt="Image SVG" />
            <span>新建文件夹</span>
          </div>
          <div>
            <a-upload
              action="/"
              @change="fileChange"
              :auto-upload="false"
              :show-file-list="false"
              multiple
            >
              <template #upload-button>
                <div class="uploadFile">
                  <img src="@/assets/img/uploadFile.svg" alt="Image SVG" />
                  <span>上传文件</span>
                </div>
              </template>
            </a-upload>
          </div>
          <div>
            <a-upload
              action="/"
              @change="fileChange"
              :auto-upload="false"
              :show-file-list="false"
              directory
            >
              <template #upload-button>
                <div class="uploadFiles">
                  <img src="@/assets/img/uploadFiles.svg" alt="Image SVG" />
                  <span>上传文件夹</span>
                </div>
              </template>
            </a-upload>
          </div>
        </div>
      </div>
    </template>
    <template #name="{ record }">
      <a-input
        v-if="record.edit"
        :style="{ width: '300px' }"
        :default-value="getPathName(record.key)"
        @click.stop=""
        @change="(value) => editChange(value, record)"
        placeholder="请输入名称"
      ></a-input>
      <span
        v-else
        :style="{
          display: 'inline-flex',
          alignItems: 'center',
        }"
      >
        <img
          :src="imgHandle(record.floderType, record.file?.name)"
          alt="Image SVG"
          :style="{
            width: '33px',
            height: '38px',
            marginRight: '5px',
          }"
        />
        <span>
          {{ getPathName(record.key) }}
        </span>
      </span>
    </template>
    <template #size="{ record }">
      <!-- <span>
        {{ useResourceManager.getSize(record.key) }}
      </span> -->
    </template>
    <template #controls="{ record }">
      <a-button type="text" @click.stop="renameClick(record)">重命名</a-button>
      <a-button type="text" style="color: #f01f1f" @click.stop="delBtn(record)">
        移除
      </a-button>
    </template>
  </a-table>
  <a-upload
    action="/"
    @change="fileChange"
    :auto-upload="false"
    :show-file-list="false"
    multiple
  >
    <template #upload-button>
      <a-button type="primary">上传文件</a-button>
    </template>
  </a-upload>
  <a-upload
    action="/"
    @change="fileChange"
    :auto-upload="false"
    :show-file-list="false"
    directory
  >
    <template #upload-button>
      <a-button type="primary" style="margin: 0 15px">上传文件夹</a-button>
    </template>
  </a-upload>
  <a-button type="primary" @click="AddFile">新建文件夹</a-button>
  <a-button type="primary" style="margin: 0 15px">确定</a-button>
</template>

<script setup lang="ts">
import { useStoreResourceManager } from '@/store/modules/resourceManager';
import { FileItem } from '@arco-design/web-vue';

const useResourceManager = useStoreResourceManager();

const targetPath = ref('');

const tableData = ref<any[]>([]);
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    slotName: 'name',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '大小',
    dataIndex: 'size',
    tooltip: true,
    slotName: 'size',
  },
  {
    title: '操作',
    slotName: 'controls',
  },
];
//滚动条
const scrollbar = ref(true);
const scroll = {
  x: 0,
  y: '100%',
};

/**
 * 面包屑点击事件
 */
const breadcrumb = (item: string) => {
  targetPath.value = item == '' ? '' : `${item}/`;
};

/**
 * 上传文件
 */
const fileChange = (_fileList: FileItem[], fileItem: FileItem) => {
  let key = targetPath.value;
  if (fileItem.file?.webkitRelativePath) {
    key += fileItem.file?.webkitRelativePath;
  } else {
    key += fileItem.file?.name;
  }
  useResourceManager.uploadFile(fileItem, 'file', key);
  tableData.value = useResourceManager.getList(targetPath.value);
};

/**
 * 行点击
 */
const rowClick = (record: any) => {
  if (record.floderType === 'folder') {
    targetPath.value = record.key + '/';
    return;
  }
};

const editChange = (value: string, record: any) => {
  // useResourceManager.renameFile(`${targetPath.value}${value}`, record);
  tableData.value.forEach((item) => {
    if (record.key === item.key) {
      item.key = `${targetPath.value}${value}`;
    }
  });
  record.edit = false;
};

/**
 * 新建文件夹
 */
const AddFile = () => {};

function getPathName(key: string) {
  return key.replace(targetPath.value, '');
}

function imgHandle(floderType: string, name: string) {
  if (floderType == 'folder') {
    return '/src/assets/img/filesSVG.svg';
  } else {
    const image = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;
    const video = /\.(mp4|mkv|avi|mov|wmv|flv)$/i;
    const audio = /\.(mp3|wav|flac|aac|ogg)$/i;
    const packages = /\.(zip|rar|tar|gz|7z)$/i;
    const file = /\.(txt|text|md)$/i;
    const word = /\.(doc|docx)$/i;
    const excel = /\.(xlsx|xls)$/i;
    const ppt = /\.(pptx|ppt)$/i;
    const pdf = /\.(pdf)$/i;

    if (file.test(name)) {
      return '/src/assets/img/fileSVG.svg';
    } else if (image.test(name)) {
      return '/src/assets/img/imgSVG.svg';
    } else if (excel.test(name)) {
      return '/src/assets/img/excelSVG.svg';
    } else if (word.test(name)) {
      return '/src/assets/img/wordSVG.svg';
    } else if (ppt.test(name)) {
      return '/src/assets/img/pptSVG.svg';
    } else if (packages.test(name)) {
      return '/src/assets/img/package.svg';
    } else if (pdf.test(name)) {
      return '/src/assets/img/pdfSvg.svg';
    } else if (video.test(name)) {
      return '/src/assets/img/videoSVG.svg';
    } else if (audio.test(name)) {
      return '/src/assets/img/musieSVG.svg';
    } else {
      return '/src/assets/img/fileSVG.svg';
    }
  }
}
</script>

<style scoped lang="scss">
.empty {
  width: 100%;
  height: 455px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .emptyText {
    font-size: 20px;
    margin: 70px 0 30px;
  }
  .emptyBnts {
    width: 500px;
    display: flex;
    justify-content: space-between;

    div {
      width: 150px;
      height: 170px;
      border-radius: 16px;
      background: rgba(245, 245, 246, 0.9);
      font-size: 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 66px;
        height: 63px;
      }
    }
  }
}
</style>
