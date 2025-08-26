<template>
  <div class="flex">
    <ExcelReader class="w-[200px]"/>
    <BackTest :data="testData" />
  </div>
</template>

<script lang="ts" setup>
import BackTest from '../components/BackTest.vue';
import ExcelReader from '../components/ExcelReader.vue';
import testData from '../const';
</script>

<style scoped></style>

