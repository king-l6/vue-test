import { LayoutList } from 'lucide-vue-next';

import type { routeItem } from '../router';

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
      name: 'LargeMarketCapitalization',
      component: () => import('./LargeMarketCapitalization.vue'),
    },
  },
];

export default config;

