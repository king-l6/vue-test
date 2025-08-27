import { createApp } from 'vue';
import 'reflect-metadata';
import './assets';
import './style.css';
// 由于App.vue没有默认导出，使用具名导入
import App from './App.vue';
import initRouter from './router';

(async () => {
  const app = createApp(App);
  const router = initRouter();
  app.use(router);
  await router.isReady();
  app.mount('#app');
})();

