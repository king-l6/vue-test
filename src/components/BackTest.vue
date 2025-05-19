<template>
  <VChart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { ref } from 'vue';
import VChart from 'vue-echarts';

use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

const { data } = defineProps({
  data: {
    type: Array as () => Array<{
      date: string;
      tenBefore: { all: number; green: number };
      morning: { all: number; green: number };
      all: { all: number; green: number };
      noTrading: { all: number; green: number };
    }>,
    required: true,
  },
});

const option = ref({
  tooltip: {
    trigger: 'axis',
    formatter: (params: any) => {
      return params
        .map(
          (item: any) =>
            `${item.seriesName}: ${(item.value[1] * 100).toFixed(2)}%`,
        )
        .join('<br/>');
    },
  },
  legend: {
    data: ['十点前', '上午', '全天', '无交易'],
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 1,
    axisLabel: {
      formatter: (value: number) => `${(value * 100).toFixed(0)}%`,
    },
  },
  series: [
    {
      name: '十点前',
      type: 'line',
      data: data.map((item, index, array) => {
        const total = array.slice(0, index + 1).reduce(
          (acc, curr) => {
            return {
              all: acc.all + curr.tenBefore.all,
              green: acc.green + curr.tenBefore.green,
            };
          },
          { all: 0, green: 0 },
        );
        return [
          new Date(item.date).getTime(),
          total.all > 0 ? total.green / total.all : 0,
        ];
      }),
    },
    {
      name: '上午',
      type: 'line',
      data: data.map((item, index, array) => {
        const total = array.slice(0, index + 1).reduce(
          (acc, curr) => {
            return {
              all: acc.all + curr.morning.all,
              green: acc.green + curr.morning.green,
            };
          },
          { all: 0, green: 0 },
        );
        return [
          new Date(item.date).getTime(),
          total.all > 0 ? total.green / total.all : 0,
        ];
      }),
    },
    {
      name: '全天',
      type: 'line',
      data: data.map((item, index, array) => {
        const total = array.slice(0, index + 1).reduce(
          (acc, curr) => {
            return {
              all: acc.all + curr.all.all,
              green: acc.green + curr.all.green,
            };
          },
          { all: 0, green: 0 },
        );
        return [
          new Date(item.date).getTime(),
          total.all > 0 ? total.green / total.all : 0,
        ];
      }),
    },
    {
      name: '无交易',
      type: 'line',
      data: data.map((item, index, array) => {
        const total = array.slice(0, index + 1).reduce(
          (acc, curr) => {
            return {
              all: acc.all + curr.noTrading.all,
              green: acc.green + curr.noTrading.green,
            };
          },
          { all: 0, green: 0 },
        );
        return [
          new Date(item.date).getTime(),
          total.all > 0 ? total.green / total.all : 0,
        ];
      }),
    },
  ],
  symbol: 'none',
  lineStyle: {
    width: 2,
  },
  itemStyle: {
    color: '#00AEEC',
  },
  showSymbol: false,
  emphasis: {
    focus: 'series',
  },
});
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>

