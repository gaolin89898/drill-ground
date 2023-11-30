import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from 'vue-router';

const routes = [{ path: '/', component: () => import('@/view/index.vue') }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
