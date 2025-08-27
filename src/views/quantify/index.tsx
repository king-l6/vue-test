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
];

export default config;

