<template>
  <div>
    <h3 class="flex text-lg font-semibold mb-2 ml-2 mt-5">大市值</h3>
    <div class="flex">
      <div class="grow"></div>
      <Button
        @click="
          () => {
            (isMain = !isMain), initData();
          }
        "
        type="primary"
        class="mr-2"
        >切换</Button
      >
    </div>
    <LineChart :chartData="state.data" />
    <Table
      rowKey="id"
      size="small"
      :scroll="{ y: 600 }"
      :pagination="{
        pageSize: 100,
      }"
      :columns="configTable"
      :dataSource="state.data"
    ></Table>
  </div>
</template>

<script lang="tsx" setup>
import { computed, onMounted } from 'vue';
import { Table, Button } from 'ant-design-vue';
import useLargeMarketList from '../hooks/useLargeMarketList';
import LineChart from '../components/LineChart.vue';

const { state, isMain, initData } = useLargeMarketList();

onMounted(async () => {
  await initData();
});
const configTable = computed(
  () =>
    [
      {
        title: '日期',
        dataIndex: 'createTime',
        key: 'createTime',
        sort: true,
        width: 100,
        minWidth: 160,
      },
      {
        title: '股票名称',
        dataIndex: 'stockName',
        key: 'stockName',
        width: 100,
        minWidth: 160,
      },
      {
        title: '开盘入涨跌幅',
        dataIndex: 'closeOpenPrice',
        key: 'closeOpenPrice',
        width: 100,
        minWidth: 260,
        customCell: () => ({
          class: 'text-sm text-center',
        }),
        customRender: ({ record }: { record: any }) => (
          <div
            class={
              (record.closeOpenPrice || '').startsWith('-')
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
              (record.closeOpenPrice || '').startsWith('-')
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
        width: 120,
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
              record.stokcCode.startsWith('60') ||
              record.stokcCode.startsWith('00')
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
        title: '五星',
        dataIndex: 'stars',
        key: 'stars',
        width: 120,
        filters: [
          {
            text: '11110',
            value: '11110',
          },
        ],
        onFilter: (value: string, record: any) => record.stars.includes(value),
      },

      {
        dataIndex: 'zhanwei',
        width: '30%',
      },
    ] as any[],
);
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>

