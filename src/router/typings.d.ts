import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]; // 可访问此页面的角色数组
    requiresAuth: boolean; // 是否需要登录
    icon?: string; // 菜单图标
    locale?: string; // 菜单/Breadcrumb 显示的语言键
    hideInMenu?: boolean; // 是否在菜单中隐藏
    hideChildrenInMenu?: boolean; // 是否隐藏子菜单
    activeMenu?: string; // 高亮的菜单项
    order?: number; // 菜单排序
    noAffix?: boolean; // 是否固定在 tab 标签栏
    ignoreCache?: boolean; // 是否缓存页面
  }
}
