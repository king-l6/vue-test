import { ref, type Ref } from 'vue';
import { getPreviousWorkdays } from '../utils/getDateList';
import { getLocalBigMarketList } from '../api';
import { plainToInstance } from 'class-transformer';
import LargeMarketList from '../models/LargeMarket';

const useLargeMarketList = () => {
  const starsList = ref<
    {
      star: string;
      count: number;
      positivePercentage: string;
    }[]
  >([]);
  const state: Ref<{
    data: any[];
    loading: boolean;
  }> = ref({
    data: [],
    loading: false,
  });
  const isMain = ref(false);
  const previousWorkdays = getPreviousWorkdays(50);
  const initData = async () => {
    const result: any[] = [];

    const { data } = await getLocalBigMarketList({
      dates: previousWorkdays.join(','),
    });
    if (!isMain.value) {
      state.value.data = plainToInstance(LargeMarketList, data.data).items;
      console.log(state.value.data);
    } else {
      state.value.data = plainToInstance(
        LargeMarketList,
        data.data,
      ).items.filter(
        (item) =>
          item.stokcCode.startsWith('00') || item.stokcCode.startsWith('60'),
      );
    }

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
    isMain,
    starsList,
    initData,
  };
};

export default useLargeMarketList;

