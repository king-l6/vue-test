<template>
  <div>
    <h3 class="flex text-lg font-semibold mb-2 ml-2 mt-5">
      （五星-高分）量化重叠
    </h3>
    <div class="flex">
      <Form :model="params" :wrapper-col="{ span: 6 }" class="w-[1000px]">
        <FormItem label="Stars" name="star">
          <Select
            v-model:value="params.stars"
            :options="starsOptions"
            allowClear
            @change="initData"
          />
        </FormItem>
      </Form>
      <div class="grow"></div>
      <Button
        @click="
          () => {
            (isFirst = !isFirst), initData();
          }
        "
        type="primary"
        class="mr-2"
        >切换</Button
      >
      <Button @click="exportData" type="primary" class="mr-2">导出</Button>
    </div>
    <LineChart :chartData="state.data" />
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
import { computed, onMounted } from 'vue';
import { Button, Form, FormItem, Select, Table, Tag } from 'ant-design-vue';
import LineChart from '../components/LineChart.vue';
import * as XLSX from 'xlsx';
import useStarScoreOverlapList from '../hooks/useStarScoreOverlapList';
const { state, params, isFirst, starsList, initData } =
  useStarScoreOverlapList();
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
        ],
        onFilter: (value: string, record: any) => {
          if (value === 'mainboard') {
            return (
              record.stokcCode.startsWith('60') ||
              record.stokcCode.startsWith('00')
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
      ws[closeOpenPriceCell].s = {
        fill: { fgColor: { rgb: 'FF00AA00' }, patternType: 'solid' },
      }; // Green for negative
    } else if (row.开盘入涨跌幅) {
      if (!ws[closeOpenPriceCell]) ws[closeOpenPriceCell] = {};
      ws[closeOpenPriceCell].s = {
        fill: { fgColor: { rgb: 'FFAA0000' }, patternType: 'solid' },
      }; // Red for positive
    }

    if (row.涨跌幅 && String(row.涨跌幅).startsWith('-')) {
      if (!ws[changeRateCell]) ws[changeRateCell] = {};
      ws[changeRateCell].s = {
        fill: { fgColor: { rgb: 'FF00AA00' }, patternType: 'solid' },
      }; // Green for negative
    } else if (row.涨跌幅) {
      if (!ws[changeRateCell]) ws[changeRateCell] = {};
      ws[changeRateCell].s = {
        fill: { fgColor: { rgb: 'FFAA0000' }, patternType: 'solid' },
      }; // Red for positive
    }
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '五星量化数据');
  XLSX.writeFile(wb, '五星量化数据.xlsx');
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

