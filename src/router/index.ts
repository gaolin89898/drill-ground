import {
  createRouter,
  // createWebHistory,
  RouteRecordRaw,
  createWebHashHistory,
} from 'vue-router';
import Layout from '@/LayOut/index.vue';

const routes: RouteRecordRaw[] = [
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
          hidden: false,
        },
      },
      {
        path: '/fileExplorer',
        name: 'fileExplorer',
        component: () => import('@/view/fileExplorer/index.vue'),
        meta: {
          title: '资源管理器',
          icon: 'drill-ziyuanguanliqi',
          hidden: false,
        },
      },
      {
        path: '/book_manage',
        name: 'book_manage',
        component: () => import('@/view/book_manage/index.vue'),
        meta: {
          title: '阅读图书管理',
          icon: 'drill-ziyuanguanliqi',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/VueDragResize',
    name: 'VueDragResize',
    component: () => import('@/view/components/VueDragResize/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    name: 'login',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
