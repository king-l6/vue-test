import { LayoutList } from 'lucide-vue-next';

import type { routeItem } from '../../router';

const config: routeItem = [
  {
    menu: [
      {
        label: '大市值',
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
];

export default config;

