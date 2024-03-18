import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import VueMacros from 'unplugin-vue-macros/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        {
          axios: [['default', 'axios']],
        },
      ],
      dts: './auto-imports.d.ts',
    }),
    Components({
      dts: true,
      resolvers: [ArcoResolver()],
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      include: [/\.vue$/, /\.vue\?vue/],
      deep: true,
      allowOverrides: false,
      dirs: ['src/components', 'src/layouts'],
    }),
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // css: {
  //   /* CSS 预处理器 */
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "./src/assets/styles/index.scss"',
  //     },
  //   },
  // },
  server: {
    port: 9400,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.0.219:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
