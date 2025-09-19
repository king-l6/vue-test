<template>
  <div>
    <h3 class="flex text-lg font-semibold mb-2 ml-2 mt-5">高分量化</h3>
    <Form :model="params" :wrapper-col="{ span: 6 }" class="w-[1000px]">
      <FormItem label="Stars" name="Stars">
        <Select v-model:value="params.stars" :options="starsOptions" />
      </FormItem>
      <FormItem label="Date" name="totalScore">
        <InputNumber  v-model:value="params.totalScore" @change="initData"></InputNumber>
      </FormItem>
    </Form>
     <Button
        @click="exportData"
        type="primary"
        class="mr-2"
        >导出</Button
      >

    <Table
      rowKey="id"
      :scroll="{ y: 600 }"
      size="small"
      :pagination="{
        pageSize: 500,
      }"
      :columns="configTable"
      :dataSource="state.data"
    ></Table>
  </div>
</template>

<script lang="tsx" setup>
import { computed, onMounted, ref } from 'vue';
import { Form, FormItem, Select, Table, Tag,Button, InputNumber } from 'ant-design-vue';
import useHighScoreList from '../hooks/useHighScoreList';
import * as XLSX from 'xlsx';

const { state,params, starsList, initData } = useHighScoreList();

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
        title: '量化评分',
        dataIndex: 'totalScore',
        key: 'totalScore',
        width: 120,
      },
      {
        dataIndex: 'zhanwei',
        width: '30%',
      },
    ] as any[],
);
const starsOptions = computed(() =>
  starsList.value.map((item) => {
    return {
      label: (
        <div class={'flex items-center gap-2'}>
          <span>{item.star}</span>
          <Tag color='red' class={'text-red-700'}>
            胜率：{item.positivePercentage}
          </Tag>
          <span>样本：{item.count}</span>
        </div>
      ),
      value: item.star,
    };
  }),
);

const exportData = () => {
  const data = state.value.data
    .filter(
      (item) =>
        item.stokcCode.startsWith('60') || item.stokcCode.startsWith('00'),
    )
    .map((item) => ({
    日期: item.createTime,
    股票名称: item.stockName,
    开盘入涨跌幅: item.closeOpenPrice,
    涨跌幅: item.changeRate,
    股票代码: item.stokcCode,
    五星: item.stars,
  }));

  const ws = XLSX.utils.json_to_sheet(data);

  // Apply conditional formatting for '开盘入涨跌幅' and '涨跌幅'
  data.forEach((row, index) => {
    const closeOpenPriceCell = `C${index + 2}`;
    const changeRateCell = `D${index + 2}`;

    if (row.开盘入涨跌幅 && String(row.开盘入涨跌幅).startsWith('-')) {
      if (!ws[closeOpenPriceCell]) ws[closeOpenPriceCell] = {};
      ws[closeOpenPriceCell].s = { fill: { fgColor: { rgb: "FF00AA00" }, patternType: "solid" } }; // Green for negative
    } else if (row.开盘入涨跌幅) {
      if (!ws[closeOpenPriceCell]) ws[closeOpenPriceCell] = {};
      ws[closeOpenPriceCell].s = { fill: { fgColor: { rgb: "FFAA0000" }, patternType: "solid" } }; // Red for positive
    }

    if (row.涨跌幅 && String(row.涨跌幅).startsWith('-')) {
      if (!ws[changeRateCell]) ws[changeRateCell] = {};
      ws[changeRateCell].s = { fill: { fgColor: { rgb: "FF00AA00" }, patternType: "solid" } }; // Green for negative
    } else if (row.涨跌幅) {
      if (!ws[changeRateCell]) ws[changeRateCell] = {};
      ws[changeRateCell].s = { fill: { fgColor: { rgb: "FFAA0000" }, patternType: "solid" } }; // Red for positive
    }
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '高分量化');
  XLSX.writeFile(wb, '高分量化.xlsx');
};
</script>

<style scoped>
.home {
  padding: 20px;
}

:deep(.ant-dropdown-menu-title-content) {
  display: flex !important;
}
</style>

