<template>
  <a-row>
    <a-col :span="12">
      <a-button type="primary" @click="AddArticle">
        <template #icon>
          <icon-plus />
        </template>
        创建文章
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
        <a-option>发布时间</a-option>
        <a-option>修改时间</a-option>
      </a-select>
      <a-range-picker :style="{ width: '254px', marginLeft: '16px' }" />
    </a-col>
  </a-row>
  <a-table
    :columns="columns"
    :bordered="false"
    :hoverable="false"
    filter-icon-align-left
    :style="{
      marginTop: '16px',
    }"
    :data="articleData"
  >
    <!-- 状态 -->
    <template #status="{ record }">
      <span style="display: inline-flex; align-items: center">
        <Icon
          icon-type="drill-dian"
          :color="record.status == '已发布' ? 'green' : 'red'"
          size="10"
        ></Icon>
        <span style="padding-left: 5px">{{ record.status }}</span>
      </span>
    </template>
    <!-- 分类 -->
    <template #classify="{ record }">
      <template v-for="item in record.classify">
        <span style="display: inline-flex; align-items: center">
          <Icon :icon-type="item.icon" color="" size="14"></Icon>
          <span style="padding-left: 5px">{{ item.value }}</span>
        </span>
      </template>
    </template>
    <!-- 标签 -->
    <template #tag="{ record }">
      <template v-for="item in record.tag">
        <a-tag color="arcoblue">{{ item }}</a-tag>
      </template>
    </template>
    <template #operate="{ record }">
      <a-button type="text" @click="editArticle(record)">编辑</a-button>
      <a-button type="text" status="danger">删除</a-button>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { TableColumnData } from '@arco-design/web-vue';
import { articleList } from '@/api/article/index';

const router = useRouter();

const columns: TableColumnData[] = [
  {
    title: '标题',
    dataIndex: 'articleName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    filterable: {
      filters: [
        {
          text: '已发布',
          value: '1',
        },
        {
          text: '未发布',
          value: '2',
        },
      ],
      filter: (value, record) => record.salary > value,
    },
    slotName: 'status',
  },
  {
    title: '分类',
    dataIndex: 'classID',
    filterable: {
      filters: [
        {
          text: '已发布',
          value: '1',
        },
        {
          text: '未发布',
          value: '2',
        },
      ],
      filter: (value, record) => record.salary > value,
      multiple: true,
    },
    slotName: 'classID',
  },
  {
    title: '标签',
    dataIndex: 'tagID',
    filterable: {
      filters: [
        {
          text: '已发布',
          value: '1',
        },
        {
          text: '未发布',
          value: '2',
        },
      ],
      filter: (value, record) => record.salary > value,
      multiple: true,
    },
    slotName: 'tagID',
  },
  {
    title: '发布时间',
    dataIndex: 'createAt',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '修改时间',
    dataIndex: 'reviseAt',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作',
    dataIndex: 'operate',
    slotName: 'operate',
    align: 'center',
  },
];

const articleData = ref([]);
const selectValue = ref<string>('发布时间');

const articleListFun = async () => {
  await articleList().then((res) => {
    articleData.value = res.data.data;
  });
};

/**
 * 添加文章
 */
const AddArticle = () => {
  router.push({
    path: '/blog_management/addArticle',
  });
};
/**
 * 编辑文章
 */
const editArticle = (_record: any) => {
  router.push({
    path: '/blog_management/addArticle',
  });
};

onMounted(() => {
  articleListFun();
});
</script>

<style scoped lang="scss">
.ll {
  display: flex;
  justify-content: flex-end;
}
</style>
