import { ref, type Ref } from 'vue';
import { getPreviousWorkdays } from '../utils/getDateList';
import { getFiveStarsList } from '../api';
import { LargeMarket } from '../models/LargeMarket';
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
  const previousWorkdays = getPreviousWorkdays(50);

  let idCounter = 0;

  const initData = async () => {
    const result: any[] = [];
    await Promise.all(
      previousWorkdays.map(async (date) => {
        const { data } = await getFiveStarsList({
          date,
          url: '/qs_svc/v1/stock_start_rank',
          version: 2,
        });
        if (data?.result?.total_count) {
          data.result.records.forEach((item: any) => {
            result.push(
              plainToInstance(LargeMarket, {
                id: ++idCounter,
                stock_name: item.stock_name,
                create_time: item.create_time,
                stock_code: item.stock_code,
                change_rate: item.change_rate,
                open_price: item.open_price,
                price: item.price,
                star1: item.star1,
                star2: item.star2,
                star3: item.star3,
                star4: item.star4,
                star5: item.star5,
              }),
            );
          });
        }
      }),
    );
    state.value.data = result;

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

    console.log(state.value.data, starsList.value);
  };

  return {
    state,
    starsList,
    initData,
  };
};

export default useFiveStarsList;

