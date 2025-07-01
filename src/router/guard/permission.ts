// 引入 Vue Router 类型
import type { Router, RouteRecordNormalized } from 'vue-router';
// 引入页面顶部进度条
import NProgress from 'nprogress';

import usePermission from '@/hooks/permission'; // 权限控制 hook
import { useUserStore, useAppStore } from '@/store'; // 用户和应用状态
import { appRoutes } from '../routes'; // 本地路由列表
import { WHITE_LIST, NOT_FOUND } from '../constants'; // 路由白名单、404 路由

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore(); // 应用状态（包含是否从服务端加载菜单等）
    const userStore = useUserStore(); // 用户状态（角色、权限等）
    const Permission = usePermission(); // 权限逻辑封装（accessRouter、findFirstPermissionRoute 等）
    const permissionsAllow = Permission.accessRouter(to); // 判断当前路由是否被允许访问
    if (appStore.menuFromServer) {
      // 针对来自服务端的菜单配置进行处理
      // Handle routing configuration from the server

      // 根据需要自行完善来源于服务端的菜单配置的permission逻辑
      // 如果菜单尚未加载，且当前路由不在白名单中，则拉取菜单配置
      if (
        !appStore.appAsyncMenus.length &&
        !WHITE_LIST.find((el) => el.name === to.name)
      ) {
        await appStore.fetchServerMenuConfig(); // 异步拉取菜单
      }
      const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST];

      let exist = false;
      while (serverMenuConfig.length && !exist) {
        const element = serverMenuConfig.shift();
        if (element?.name === to.name) exist = true;

        if (element?.children) {
          serverMenuConfig.push(
            ...(element.children as unknown as RouteRecordNormalized[])
          );
        }
      }
      if (exist && permissionsAllow) {
        next();
      } else next(NOT_FOUND);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (permissionsAllow) next();
      else {
        const destination =
          Permission.findFirstPermissionRoute(appRoutes, userStore.role) ||
          NOT_FOUND;
        next(destination);
      }
    }
    NProgress.done();
  });
}
