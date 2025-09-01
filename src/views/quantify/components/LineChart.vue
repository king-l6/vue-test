<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import {
  CanvasRenderer
} from 'echarts/renderers';
import {
  LineChart
} from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import dayjs from 'dayjs';

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
});

const option = computed(() => {
  // 对数据进行排序，确保日期是升序的
  const sortedChartData = [...props.chartData].sort((a: any, b: any) => {
    return dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf();
  });

  const dates = sortedChartData.map((item: any) => dayjs(item.createTime).format('YYYY-MM-DD'));
  let cumulativeValue = 1;
  const values = sortedChartData.map((item: any) => {
    const change = parseFloat(item.closeOpenPrice.replace('%', '')) / 100;
    cumulativeValue *= (1 + change);
    return (cumulativeValue * 100).toFixed(2);
  });

  return {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        let result = params[0].name + '<br/>';
        params.forEach(function (item: any) {
          result += item.marker + item.seriesName + ': ' + item.value + '%<br/>';
        });
        return result;
      }
    },
    xAxis: {
      type: 'category',
      data: dates,
    },
    yAxis: {
      type: 'value',
      min: 0, // 设置纵轴起始值为0
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: '收益率',
        type: 'line',
        data: values,
        smooth: true,
      },
    ],
  };
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>