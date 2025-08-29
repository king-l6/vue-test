<template>
  <div class="flex">
    <Card>
      <LargeMarket />
    </Card>
    <Card>
      <FiveStars />
    </Card>
  </div>
</template>
<script setup lang="ts">
import { Card } from 'ant-design-vue';
import FiveStars from './FiveStars.vue';
import LargeMarket from './LargeMarket.vue';
</script>

<style scoped lang="less"></style>

