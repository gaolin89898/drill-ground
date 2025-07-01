// 引入 Vue Router 中创建路由和设置 HTML5 历史模式的方法
import { createRouter, createWebHistory } from 'vue-router';

// 引入页面跳转时的进度条工具及样式
import NProgress from 'nprogress'; // 页面顶部加载进度条
import 'nprogress/nprogress.css'; // 进度条样式

// 引入自定义的路由配置
import { appRoutes } from './routes';
// 引入重定向和 404 页面配置
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from './routes/base';
// 引入自定义路由守卫函数
import createRouteGuard from './guard';

// 配置 NProgress，不显示右上角的小圆圈
NProgress.configure({ showSpinner: false }); // 只显示线条进度条

// 创建路由实例
const router = createRouter({
  // 使用 HTML5 History 模式（URL 中无 #）
  history: createWebHistory(),

  // 路由表定义
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    ...appRoutes, // 展开应用的业务路由
    REDIRECT_MAIN, // 默认主界面重定向
    NOT_FOUND_ROUTE, // 404 页面路由
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
