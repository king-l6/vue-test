<template>
  <div>
    <h3 class="flex text-lg font-semibold mb-2 ml-2 mt-5">大市值</h3>
    <Table
      rowKey="id"
      size="small"
      :scroll="{ y: 600 }"
      :pagination="{
        pageSize: 100,
      }"
      :columns="columns"
      :dataSource="state.data"
    ></Table>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { Table } from 'ant-design-vue';
import useLargeMarketList from '../hooks/useLargeMarketList';

const { state, initData } = useLargeMarketList();


onMounted(async () => {
  await initData();
});
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

