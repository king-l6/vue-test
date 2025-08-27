import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import routeConfig from '@/views/quantify';
import BiliLayout from '../components/BiliLayout.vue';
export type menuItem = {
  label: string;
  key: string;
  icon?: any;
  type?: string;
  redirct?: string;
};
export type routeItem = {
  menu: menuItem[];
  route: RouteRecordRaw;
}[];
const routes: any[] = [];
routes.push(...routeConfig.map((i: { route: any; }) => i.route));

const initRouter = () =>
  createRouter({
    history: createWebHistory('/'),
    routes: [
      {
        path: '/',
        component: BiliLayout,
        name: 'BiliLayout',
        children: routes,
      },
    ],
  });

export default initRouter;

