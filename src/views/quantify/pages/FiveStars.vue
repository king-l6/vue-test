<template>
  <div>
    <h3 class="flex text-lg font-semibold mb-2 ml-2 mt-5">大市值</h3>
    <Table
      rowKey="id"
      size="small"
      :pagination="{
        pageSize: 100,
      }"
      :columns="columns"
      :dataSource="state.data"
    ></Table>
  </div>
</template>

<script lang="tsx" setup>
import { computed, onMounted } from 'vue';
import { Table } from 'ant-design-vue';
import { getPreviousWorkdays } from '../utils/getDateList';
import useFiveStarsList from '../hooks/useFiveStarsList';

const { state, initData } = useFiveStarsList();
const previousWorkdays = getPreviousWorkdays(50);

console.log(previousWorkdays);

onMounted(async () => {
  await initData();
});
const columns = computed(() => [
  {
    title: '日期',
    dataIndex: 'createTime',
    key: 'createTime',
    sort: true,
    width: 100,
  },
  {
    title: '股票名称',
    dataIndex: 'stockName',
    key: 'stockName',
    width: 100,
  },
  {
    title: '开盘入涨跌幅',
    dataIndex: 'closeOpenPrice',
    key: 'closeOpenPrice',
    width: 100,
    customCell: () => ({
      class: 'text-sm text-center',
    }),
    customRender: ({ record }: { record: any }) => (
      <div
        class={
          record.closeOpenPrice.startsWith('-')
            ? 'text-white bg-green-700'
            : 'text-white bg-red-700'
        }
      >
        {record.closeOpenPrice}
      </div>
    ),
  },
  {
    title: '涨跌幅',
    dataIndex: 'changeRate',
    key: 'changeRate',
    width: 100,
    customCell: () => ({
      class: 'text-sm text-center',
    }),
    customRender: ({ record }: { record: any }) => (
      <div
        class={
          record.changeRate.startsWith('-')
            ? 'text-white bg-green-300'
            : 'text-white bg-red-300'
        }
      >
        {record.changeRate}
      </div>
    ),
  },
  {
    title: '股票代码',
    dataIndex: 'stokcCode',
    key: 'stokcCode',
    width: 100,
    filters: [
      {
        text: '主板',
        value: 'mainboard',
      },
      {
        text: '创业板',
        value: 'gem',
      },
      {
        text: '其他',
        value: 'other',
      },
    ],
    onFilter: (value: string, record: any) => {
      if (value === 'mainboard') {
        return (
          record.stokcCode.startsWith('60') || record.stokcCode.startsWith('00')
        );
      } else if (value === 'gem') {
        return record.stokcCode.startsWith('30');
      } else {
        return !(
          record.stokcCode.startsWith('60') ||
          record.stokcCode.startsWith('00') ||
          record.stokcCode.startsWith('30')
        );
      }
    },
  },
  {
    dataIndex: 'zhanwei',
    width: '60%',
  },
]);
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>

