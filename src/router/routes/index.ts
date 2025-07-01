// 引入 vue-router 中的标准路由类型定义（已经解析的标准格式）
import type { RouteRecordNormalized } from 'vue-router';

// 动态导入 ./modules 目录下的所有 ts 文件，并立即执行（eager: true 表示非懒加载）
// 用于加载项目内部业务路由模块
const modules = import.meta.glob('./modules/*.ts', { eager: true });

// 动态导入 ./externalModules 目录下的所有 ts 文件，用于加载外部模块的路由（比如插件或第三方集成部分）
const externalModules = import.meta.glob('./externalModules/*.ts', {
  eager: true,
});

// 格式化加载的模块为标准路由数组
function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default; // 获取每个模块的默认导出
    if (!defaultModule) return; // 如果没有默认导出，跳过

    // 判断是否为数组形式导出，支持单个路由或多个路由模块
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

// 加载内部模块的标准路由数组，作为应用主路由表导出
export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

// 加载外部扩展模块的路由数组（比如插件路由），按需使用
export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
  externalModules,
  []
);
