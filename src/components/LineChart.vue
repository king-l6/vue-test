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

const props = defineProps({
  data: {
    type: Array as () => Array<{
      metric: {
        hostname: string;
        containerEnvAppId: string;
        containerEnvPodName: string;
      };
      values: Array<[number, string]>;
    }>,
    required: true,
  },
});

const option = ref({
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: props.data.map(
      (item) => item.metric.hostname
        || item.metric.containerEnvPodName
        || item.metric.containerEnvAppId
        || 'Unknown',
    ),
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
    scale: true,
    axisLabel: {
      formatter: function(value: number) {
        if (value >= 1e12) {
          return (value / 1e12).toFixed(1) + 'T';
        } else if (value >= 1e9) {
          return (value / 1e9).toFixed(1) + 'B';
        } else if (value >= 1e6) {
          return (value / 1e6).toFixed(1) + 'M';
        } else if (value >= 1e3) {
          return (value / 1e3).toFixed(1) + 'K';
        } else if (value >= 1e15) {
          return value.toExponential(2);
        }
        return value;
      }
    }
  },
  series: props.data.map((item, index) => ({
    name:
      item.metric.hostname
      || item.metric.containerEnvPodName
      || item.metric.containerEnvAppId
      || 'Unknown',
    type: 'line',
    data: item.values.map(([timestamp, value]) => [
      timestamp * 1000,
      parseFloat(value),
    ]),
    symbol: 'none',
    lineStyle: {
      width: 2,
    },
    itemStyle: {
      color: index === 0 ? '#00AEEC' : '#FF7F24',
    },
    showSymbol: false,
    emphasis: {
      focus: 'series',
    },
  })),
});
</script>

<style scoped>
.chart {
  height: 400px;
  width: 50%;
  display: inline-block;
}
</style>
