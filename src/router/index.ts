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
    redirect: '/fileExplorer',
    children: [
      {
        path: '/fileExplorer',
        name: 'fileExplorer',
        component: () => import('@/view/fileExplorer/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
