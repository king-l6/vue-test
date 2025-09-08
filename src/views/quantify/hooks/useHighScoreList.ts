import { ref, type Ref } from 'vue';
import { getPreviousWorkdays } from '../utils/getDateList';
import { getHighScoreList, getLocalHighScoreList } from '../api';
import LargeMarketList, { LargeMarket } from '../models/LargeMarket';
import { plainToInstance } from 'class-transformer';

const useFiveStarsList = () => {
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
  const previousWorkdays = getPreviousWorkdays(85);

  const initData = async () => {
    const result: any[] = [];
  
    const { data } = await getLocalHighScoreList({
      dates: previousWorkdays.join(','),
    });
    state.value.data = plainToInstance(LargeMarketList, data.data).items;
    const starsStatsMap = new Map<
      string,
      { count: number; positiveCount: number }
    >();
    result.forEach((item) => {
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
    starsList,
    initData,
  };
};

export default useFiveStarsList;

