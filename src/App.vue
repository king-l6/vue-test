<template>
   <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#00AEEC',
        colorInfo: '#00AEEC',
        colorSuccess: '#2AC864',
        colorWarning: '#FFB027',
        colorError: '#F85A54',
        colorTextBase: '#28292C',
        colorBorderSecondary: '#e3e8ec',
      },
      components: {
        Layout: {
          colorBgBody: 'none',
          colorBgHeader: 'none',
        },
        Tabs: {
          lineWidth: 0,
          margin: 0,
        },
        Modal: {
          paddingMD: 16,
          paddingContentHorizontalLG: 16,
        },
        Drawer: {
          padding: 16,
          paddingLG: 16,
        },
      },
    }"
    :locale="langZhCN"
    :auto-insert-space-in-button="false"
  >
    <RouterView />
    <Modals />
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import langZhCN from 'ant-design-vue/es/locale/zh_CN';
import { RouterView } from 'vue-router';
</script>
<style scoped></style>

