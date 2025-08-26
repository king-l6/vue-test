<template>
  1
  <!-- <StepsTabs
    :steps="[{ title: '第一步' }, { title: '第二步' }, { title: '第三步' }]"
    :initial-step="'first'"
  /> -->
  <ConfirmWithLoading :onConfirm="handleConfirm" />
</template>

<script lang="ts" setup>
import ConfirmWithLoading from '../components/ConfirmWithLoading.vue';

import axios from 'axios';
const followBus = (busId: number, id: number) =>
  axios.post('/api/ai-autolaunch/bus/bind/launch', {
    bus_id: busId,
    bind_bus_id: id,
  });

const handleConfirm = async () => {
  // 这里可以添加异步操作逻辑
  await followBus(1, 1);
  console.log('确认操作');
};
</script>

