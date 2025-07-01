// 路由白名单：不需要权限即可访问的路由（如 404 页面、登录页）
// 可用于路由守卫中放行某些页面
export const WHITE_LIST = [
  { name: 'notFound', children: [] }, // 404 页面
  { name: 'login', children: [] }, // 登录页面
];

// 404 路由的名称常量，用于标识未匹配到的路由
export const NOT_FOUND = {
  name: 'notFound',
};

// 重定向路由的名称（如 /redirect/:path*），一般在处理刷新后保留路由状态时使用
export const REDIRECT_ROUTE_NAME = 'Redirect';

// 默认首页路由的名称（可用于跳转到系统主工作台）
export const DEFAULT_ROUTE_NAME = 'Workplace';

// 默认路由对象，包含菜单标题、名称和路径等信息
// 在用户登录成功后可跳转到该默认页面
export const DEFAULT_ROUTE = {
  title: 'menu.dashboard.workplace', // 国际化菜单标题（显示在导航菜单）
  name: DEFAULT_ROUTE_NAME, // 路由名称
  fullPath: '/dashboard/workplace', // 完整路径
};
