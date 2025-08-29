import { LayoutList } from 'lucide-vue-next';

import type { routeItem } from '../../router';

const config: routeItem = [
  {
    menu: [
      {
        label: '大市值量化',
        key: '/quantify',
        icon: <LayoutList size={14} />,
      },
    ],
    route: {
      path: '/quantify',
      name: 'LargeMarket',
      component: () => import('./pages/LargeMarket.vue'),
    },
  },
  {
    menu: [
      {
        label: '盘前五星量化',
        key: '/fiveStars',
        icon: <LayoutList size={14} />,
      },
    ],
    route: {
      path: '/fiveStars',
      name: 'FiveStars',
      component: () => import('./pages/FiveStars.vue'),
    },
  },
  {
    menu: [
      {
        label: '高分量化',
        key: '/highScore',
        icon: <LayoutList size={14} />,
      },
    ],
    route: {
      path: '/highScore',
      name: 'HighScore',
      component: () => import('./pages/HighScore.vue'),
    },
  },
  {
    menu: [
      {
        label: '全部',
        key: '/all',
        icon: <LayoutList size={14} />,
      },
    ],
    route: {
      path: '/all',
      name: 'Allquantify',
      component: () => import('./pages/index.vue'),
    },
  },
];

export default config;

