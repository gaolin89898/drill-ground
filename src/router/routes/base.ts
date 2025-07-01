// 导入 Vue Router 的原始路由类型定义
import type { RouteRecordRaw } from 'vue-router';
// 从常量定义文件中导入重定向路由名称
import { REDIRECT_ROUTE_NAME } from '@/router/constants';

// 默认布局组件（一般为包含顶部、侧边栏、主内容区的页面框架）
// 使用懒加载方式导入 layout 组件
export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');

// 定义用于内部重定向的路由配置
// 当某些页面需要中转（如刷新保持跳转、权限重定向）时，会先跳转到该地址
export const REDIRECT_MAIN: RouteRecordRaw = {
  path: '/redirect',
  name: 'redirectWrapper',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      // 动态参数路径，接收需要重定向到的路径
      path: '/redirect/:path',
      name: REDIRECT_ROUTE_NAME,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
};

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/not-found/index.vue'),
};
