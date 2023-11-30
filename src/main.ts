import { createApp } from 'vue';
// import './style.css'
import App from '@/App.vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import router from '@/router';
import store from '@/store';
import '@arco-design/web-vue/dist/arco.css';
import { Icon } from '@arco-design/web-vue';

// const ArchivesIcon = Icon.addFromIconFontCn({
//   src: './assets/icon/archivesIcon.js',
// });
// .component('ArchivesIcon', ArchivesIcon)

createApp(App)
  .use(router)
  .use(store)
  .use(ArcoVueIcon)
  .mount('#app');
