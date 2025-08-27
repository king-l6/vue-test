import { ref, type Ref } from 'vue';
import { getPreviousWorkdays } from '../utils/getDateList';
import { getLargeMarketList } from '../api';
import dayjs from 'dayjs';

const useLargeMarketList = () => {
  const state: Ref<{
    data: any[];
    loading: boolean;
  }> = ref({
    data: [],
    loading: false,
  });
  const previousWorkdays = getPreviousWorkdays(50);
  const initData = async () => {
    const result: any[] = [];
    
    // 使用 Promise.all 等待所有异步操作完成
    await Promise.all(previousWorkdays.map(async (date) => {
      const { data } = await getLargeMarketList({
        date,
        url: '/qs_svc/v1/stock_start_rank_f',
        version: 2,
      });
      if (data?.result?.total_count) {
        data.result.records.forEach((item: any) => {
          result.push({
            id: item.create_time,
            name: item.stock_name,
            date: dayjs(item.create_time).format('YYYY-MM-DD'),
            code: (item.stock_code || '').split('.')[0],
          });
        });
      }
    }));
    state.value.data = result;
  };
  
  return {
    state,
    initData,
  };
};

export default useLargeMarketList;

