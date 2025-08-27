import { ref, type Ref } from 'vue';
import { getPreviousWorkdays } from '../utils/getDateList';
import { getFiveStarsList } from '../api';
import { LargeMarket } from '../models/LargeMarket';
import { plainToInstance } from 'class-transformer';

const useFiveStarsList = () => {
  const state: Ref<{
    data: LargeMarket[];
    loading: boolean;
  }> = ref({
    data: [],
    loading: false,
  });
  const previousWorkdays = getPreviousWorkdays(50);

  const initData = async () => {
    const result: any[] = [];
    let idCounter = 1;
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
                id: idCounter++,
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
    console.log(state.value.data);
  };

  return {
    state,
    initData,
  };
};

export default useFiveStarsList;

