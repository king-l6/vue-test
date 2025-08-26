<template>
  <div class="home">
    <h1 class="">首页test</h1>
    <p>欢迎来到首页</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { getData } from '../axios';

onMounted(async () => {
  await getData().then((res) => {
    console.log(res);
  });
});
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>

