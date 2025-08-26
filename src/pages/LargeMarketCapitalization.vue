<template>
  <div>
    <h1>大市值</h1>
    <Table
      rowKey="id"
      size="small"
      :pagination="{
        pageSize: 100,
      }"
      :columns="columns"
      :dataSource="tableData"
    ></Table>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue';
import { getLargeMarketData } from '../axios';
import { Table } from 'ant-design-vue';
import { getPreviousWorkdays } from '../utils/getDateList';
import dayjs from 'dayjs';
const previousWorkdays = getPreviousWorkdays(50);
console.log(previousWorkdays);
onMounted(async () => {
  await initData();
});
const tableData: Ref<any[]> = ref([]);
const initData = () => {
  previousWorkdays.forEach(async (date) => {
    const { data } = await getLargeMarketData({
      date,
      url: '/qs_svc/v1/stock_start_rank_f',
      version: 2,
    });
    // result.push(res);
    if (data?.result?.total_count) {
      data.result.records.forEach((item: any) => {
        tableData.value.push({
          id: item.create_time,
          name: item.stock_name,
          date: dayjs(item.create_time).format('YYYY-MM-DD'),
          code: (item.stock_code || '').split('.')[0],
        });
      });
    }
  });
};

const columns = computed(() => [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    sort: true,
    width: 100,
  },
  {
    title: '股票名称',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: '股票代码',
    dataIndex: 'code',
    key: 'code',
    width: '70%',
  },
]);
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>

