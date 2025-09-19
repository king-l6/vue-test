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
        label: '量化分值排名',
        key: '/scoreRanking',
        icon: <LayoutList size={14} />,
      },
    ],
    route: {
      path: '/scoreRanking',
      name: 'ScoreRanking',
      component: () => import('./pages/ScoreRanking.vue'),
    },
  },
    {
    menu: [
      {
        label: '（五星-高分）量化重叠',
        key: '/starScoreOverlap',
        icon: <LayoutList size={14} />,
      },
    ],
    route: {
      path: '/starScoreOverlap',
      name: 'StarScoreOverlap',
      component: () => import('./pages/StarScoreOverlap.vue'),
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

