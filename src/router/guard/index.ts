// 引入 Router 类型
import type { Router } from 'vue-router';
// 设置路由变化事件，用于监听路由变动（例如面包屑、标签页更新）
import { setRouteEmitter } from '@/utils/route-listener';
// 引入“用户登录信息”守卫（一般用于判断是否登录、是否需要获取用户信息）
import setupUserLoginInfoGuard from './userLoginInfo';
// 引入“权限校验”守卫（根据权限控制页面访问）
import setupPermissionGuard from './permission';

// 页面级守卫：每次路由切换前触发，用于记录路由变化、做一些全局逻辑
function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // 触发路由变化事件，可用于响应式更新标签页、面包屑等
    setRouteEmitter(to);
  });
}

// 路由守卫初始化函数，供外部调用
// 按顺序注册各类路由守卫逻辑
export default function createRouteGuard(router: Router) {
  setupPageGuard(router); // 注册页面变化监听守卫
  setupUserLoginInfoGuard(router); // 注册用户登录状态守卫（未登录跳转登录页）
  setupPermissionGuard(router); // 注册权限校验守卫（无权限跳转403等）
}
