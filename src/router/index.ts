import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from 'vue-router';
import Layout from '@/LayOut/index.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'drill-shouye',
        },
      },
      {
        path: '/article_management',
        name: 'article',
        component: () => import('@/view/article_management/index.vue'),
        meta: {
          title: '文章管理',
          icon: 'drill-16',
        },
      },
      {
        path: '/tagClassify_management',
        name: 'tagClassify',
        component: () => import('@/view/tagClassify_management/index.vue'),
        meta: {
          title: '标签，分类管理',
          icon: 'drill-biaoqian',
        },
      },
      {
        path: '/recycleBin_management',
        name: 'recycleBin',
        component: () => import('@/view/recycleBin_management/index.vue'),
        meta: {
          title: '回收站',
          icon: 'drill-huishouzhan',
        },
      },
      {
        path: '/fileExplorer',
        name: 'fileExplorer',
        component: () => import('@/view/fileExplorer/index.vue'),
        meta: {
          title: '资源管理器',
          icon: 'drill-ziyuanguanliqi',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
