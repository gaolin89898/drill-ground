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
        path: '/blog_management',
        name: 'blog',
        meta: {
          title: '博客管理',
          icon: 'drill-boke',
          hidden: false,
        },
        redirect: '/blog_management/article_management',
        children: [
          {
            path: '/blog_management/article_management',
            name: 'article',
            component: () =>
              import('@/view/blog_management/article_management/index.vue'),
            meta: {
              title: '文章管理',
              icon: 'drill-16',
              hidden: false,
            },
          },
          {
            path: '/blog_management/addArticle',
            name: 'addArticle',
            component: () =>
              import(
                '@/view/blog_management/article_management/addArticle.vue'
              ),
            meta: {
              title: '创建文章',
              icon: 'drill-16',
              hidden: false,
            },
          },
          {
            path: '/blog_management/tagClassify_management',
            name: 'tagClassify',
            component: () =>
              import('@/view/blog_management/tagClassify_management/index.vue'),
            meta: {
              title: '标签，分类管理',
              icon: 'drill-biaoqian',
              hidden: false,
            },
          },
          {
            path: '/blog_management/recycleBin_management',
            name: 'recycleBin',
            component: () =>
              import('@/view/blog_management/recycleBin_management/index.vue'),
            meta: {
              title: '回收站',
              icon: 'drill-huishouzhan',
              hidden: false,
            },
          },
        ],
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
