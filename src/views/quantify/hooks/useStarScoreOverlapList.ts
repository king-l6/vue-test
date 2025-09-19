import { ref, type Ref } from 'vue';
import { getPreviousWorkdays } from '../utils/getDateList';
import { getLocalStarScoreOverlapList } from '../api';
import LargeMarketList, { LargeMarket } from '../models/LargeMarket';
import { plainToInstance } from 'class-transformer';

const useStarScoreOverlapList = () => {
  const starsList = ref<
    {
      star: string;
      count: number;
      positivePercentage: string;
    }[]
  >([]);
  // const starsCountMap = ref<{ [key: string]: number }>({});

  const state: Ref<{
    data: LargeMarket[];
    loading: boolean;
  }> = ref({
    data: [],
    loading: false,
  });

  const params = ref({
    stars: '',
  });
  const isFirst = ref(false);
  const previousWorkdays = getPreviousWorkdays(85);

  const initData = async () => {
    const { data } = await getLocalStarScoreOverlapList({
      dates: previousWorkdays.join(','),
    });
    if (!isFirst.value) {
      state.value.data = plainToInstance(
        LargeMarketList,
        data.data,
      ).items.filter((item) =>
        params.value.stars ? item.stars === params.value.stars : item,
      );
    } else {
      state.value.data = plainToInstance(
        LargeMarketList,
        data.data,
      ).firstItems.filter((item) =>
        params.value.stars ? item.stars === params.value.stars : item,
      );
    }

    const starsStatsMap = new Map<
      string,
      { count: number; positiveCount: number }
    >();

    state.value.data.forEach((item) => {
      const star = item.stars;
      const currentStats = starsStatsMap.get(star) || {
        count: 0,
        positiveCount: 0,
      };
      // 更新总计数
      currentStats.count += 1;
      if (!item.closeOpenPrice.startsWith('-')) {
        currentStats.positiveCount += 1;
      }
      starsStatsMap.set(star, currentStats);
    });

    // 转换为数组并计算百分比
    starsList.value = Array.from(starsStatsMap.entries()).map(
      ([star, stats]) => {
        const percentage =
          stats.count > 0
            ? ((stats.positiveCount / stats.count) * 100).toFixed(2)
            : '0.00';
        return {
          star,
          count: stats.count,
          positivePercentage: `${percentage}%`,
        };
      },
    );
  };

  return {
    state,
    params,
    isFirst,
    starsList,
    initData,
  };
};

export default useStarScoreOverlapList;

