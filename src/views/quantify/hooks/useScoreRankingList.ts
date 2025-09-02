import { ref, type Ref } from 'vue';
import { getLocalScoreRankingList } from '../api';
import LargeMarketList, { LargeMarket } from '../models/LargeMarket';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';

const useScoreRankingList = () => {
  const starsList = ref<
    {
      star: string;
      count: number;
      positivePercentage: string;
    }[]
  >([]);
  // const starsCountMap = ref<{ [key: string]: number }>({});
  const params = ref({
    max_score: 288,
    min_score: 0,
    page_num: 1,
    page_size: 200,
    trade_date: dayjs().format('YYYY-MM-DD'),
  });

  const state: Ref<{
    data: LargeMarket[];
    loading: boolean;
  }> = ref({
    data: [],
    loading: false,
  });
  const initData = async () => {
    const result: any[] = [];

    const { data } = await getLocalScoreRankingList(params.value);
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
    params,
    state,
    starsList,
    initData,
  };
};

export default useScoreRankingList;

