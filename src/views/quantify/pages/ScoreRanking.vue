<template>
  <div>
    <h3 class="flex text-lg font-semibold mb-2 ml-2 mt-5">量化分值排名</h3>
    <Form :model="params" :wrapper-col="{ span: 6 }">
      <FormItem label="日期" name="trade_date">
        <DatePicker
          v-model:value="params.trade_date"
          value-format="YYYY-MM-DD" 
          @change="() => initData()"
        />
      </FormItem>
    </Form>
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
import { DatePicker, Form, FormItem, Table, Tag } from 'ant-design-vue';
import useScoreRankingList from '../hooks/useScoreRankingList';

const { params, state, starsList, initData } = useScoreRankingList();

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
</script>

<style scoped>
.home {
  padding: 20px;
}

:deep(.ant-dropdown-menu-title-content) {
  display: flex !important;
}
</style>

