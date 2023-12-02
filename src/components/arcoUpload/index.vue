<template>
  <div class="upload" id="upload">
    <a-button type="outline" @click="uploadBtn">管理文件</a-button>
    <a-button type="primary" style="margin-left: 15px" @click="submitUpload">
      确定
    </a-button>

    <a-modal
      v-model:visible="visible"
      simple
      :footer="false"
      :modalStyle="{
        width: '830px',
        height: '561px',
        borderRadius: '10px',
        padding: '25px 17px',
      }"
      :hideTitle="true"
      :bodyStyle="{
        width: '100%',
        height: '100%',
        position: 'relative',
      }"
    >
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
          marginTop: '22px',
          height: '515px',
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
          <span>
            {{ useResourceManager.getSize(record.key) }}
          </span>
        </template>
        <template #controls="{ record }">
          <a-button type="text" @click.stop="renameClick(record)">
            重命名
          </a-button>
          <a-button
            type="text"
            style="color: #f01f1f"
            @click.stop="delBtn(record)"
          >
            移除
          </a-button>
        </template>
      </a-table>
      <a-trigger
        position="tr"
        :content-style="{
          width: '110px',
          height: '116px',
          'box-shadow': '0px 4px 10px 0px rgba(0, 0, 0, 0.1)',
          'margin-bottom': '10px',
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'space-around',
        }"
        trigger="click"
      >
        <a-button
          :style="{
            position: 'absolute',
            height: '50px',
            width: '50px',
            bottom: '0',
            right: '0',
            fontSize: '20px',
          }"
          type="primary"
          shape="circle"
        >
          <template #icon>
            <icon-plus />
          </template>
        </a-button>
        <template #content>
          <a-upload
            action="/"
            @change="fileChange"
            :auto-upload="false"
            :show-file-list="false"
            multiple
          >
            <template #upload-button>
              <a-button
                type="text"
                size="mini"
                :style="{
                  width: '100%',
                  color: '#1D2129',
                }"
              >
                <template #icon>
                  <icon-upload />
                </template>
                上传文件
              </a-button>
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
              <a-button
                type="text"
                size="mini"
                :style="{
                  width: '100%',
                  color: '#1D2129',
                }"
              >
                <template #icon>
                  <icon-folder-add />
                </template>
                上传文件夹
              </a-button>
            </template>
          </a-upload>
          <a-button
            type="text"
            size="mini"
            :style="{
              color: '#1D2129',
            }"
            @click="AddFile"
          >
            <template #icon>
              <icon-folder-add />
            </template>
            新建文件夹
          </a-button>
        </template>
      </a-trigger>
    </a-modal>

    <a-modal
      v-model:visible="fileAddVisible"
      simple
      :footer="false"
      :hideTitle="true"
      :modalStyle="{
        width: '414px',
        height: '280px',
        borderRadius: '10px',
        padding: '15px',
      }"
      :bodyStyle="{
        width: '100%',
        height: '100%',
        position: 'relative',
      }"
    >
      <div class="fileAddTop">
        <span>新建文件夹</span>
      </div>
      <div class="fileAddCenter">
        <img src="@/assets/img/files.svg" alt="Image SVG" />
        <a-input
          :style="{ width: '310px' }"
          placeholder="请输入文件夹名称"
          allow-clear
          v-model="filesName"
        />
      </div>
      <div class="fileAddBottom">
        <a-button @click="fileAddCancelClick">取消</a-button>
        <a-button @click="fileAddOKClick" type="primary">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { FileItem } from '@arco-design/web-vue';
import {
  IconPlus,
  IconUpload,
  IconFolderAdd,
} from '@arco-design/web-vue/es/icon';
import { useStoreResourceManager } from '@/store/modules/resourceManager';

let visible = ref<boolean>(false);
const fileAddVisible = ref<boolean>(false);

const filesName = ref<string>('');

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
    width: 400,
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

const scrollbar = ref(true);
const scroll = {
  x: 0,
  y: '100%',
};

const uploadBtn = () => {
  visible.value = true;
};
//上传
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
//行点击
const rowClick = (record: any) => {
  if (record.floderType === 'folder') {
    targetPath.value = record.key + '/';
    return;
  }
  // let lastIndex = record.key.lastIndexOf('/');
  // let path = record.key.slice(0, lastIndex);
  // targetPath.value = path;
};
//删除
const delBtn = (record: any) => {
  useResourceManager.delFile(record.floderType, record.key);
  tableData.value = useResourceManager.getList(targetPath.value);
};
//重命名
const renameClick = (record: any) => {
  record.edit = true;
};
const editChange = (value: string, record: any) => {
  useResourceManager.renameFile(`${targetPath.value}${value}`, record);
  tableData.value.forEach((item) => {
    if (record.key === item.key) {
      item.key = `${targetPath.value}${value}`;
    }
  });
  record.edit = false;
};
//新建文件夹
const AddFile = () => {
  fileAddVisible.value = true;
};
//取消
const fileAddCancelClick = () => {
  fileAddVisible.value = false;
};
//确定
const fileAddOKClick = () => {
  useResourceManager.addFiles(
    filesName.value == '' ? '新建文件夹' : filesName.value,
    targetPath.value,
  );
  fileAddVisible.value = false;
  tableData.value = useResourceManager.getList(targetPath.value);
};

//确定上传
const submitUpload = () => {
  useResourceManager.subitUpload();
};

const breadcrumb = (item: string) => {
  targetPath.value = item == '' ? '' : `${item}/`;
};

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

function caculateSize(size: number) {
  if (!size && size !== 0) {
    return '--';
  }
  if (size < 1024) {
    return `${size}KB`;
  }
  if (1024 <= size && size < 1024 * 1024) {
    return `${Math.ceil(size / 1024)}KB`;
  }
  if (1024 * 1024 <= size && size < 1024 * 1024 * 1024) {
    return `${Math.ceil(size / (1024 * 1024))}MB`;
  }
  if (1024 * 1024 * 1024 <= size) {
    return `${Math.ceil(size / (1024 * 1024 * 1024))}GB`;
  }
}

watch(
  () => targetPath.value,
  (newVal) => {
    tableData.value = useResourceManager.getList(newVal);
    // console.log(tableData.value)
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>
<style lang="scss" scoped>
.upload {
  margin-top: 20px;
  margin-left: 20px;
}
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

.fileAddTop {
  font-size: 22px;
}
.fileAddCenter {
  width: 310px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin: 15px 0;
  }
}
.fileAddBottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  .arco-btn {
    &:nth-child(1) {
      margin-right: 15px;
    }
  }
}
</style>
