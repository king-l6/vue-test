<template>
  <Layout class="my-layout">
    <LayoutSider :width="180" class="my-sider" :collapsed="collapsed" />
    <LayoutSider
      :width="180"
      class="my-sider my-sider-fixed"
      v-model:collapsed="collapsed"
    >
      <div class="my-sider-children">
        <div class="collapsedButton" @click="collapsed = !collapsed">
          <IndentDecrease v-if="!collapsed" :size="16" />
          <IndentIncrease v-else :size="16" />
        </div>
        <Menu
          style="background: none"
          :openKeys="openKeys"
          :selectedKeys="selectedKeys"
          mode="inline"
          :items="menusData"
          @click="handleClick"
        />
      </div>
    </LayoutSider>
    <Layout>
      <LayoutContent class="my-content">
        <RouterView />
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<script setup lang="tsx">
import { Layout, Menu } from 'ant-design-vue';
import { IndentDecrease, IndentIncrease } from 'lucide-vue-next';
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import routeConfig from '@/views/quantify';
// eslint-disable-next-line no-underscore-dangle
const LayoutSider = Layout.Sider;
const LayoutContent = Layout.Content;

const route = useRoute();
const router = useRouter();

const collapsed = ref(false);
// const path = `/${(route.matched || [])[0]?.path.split('/')[1]}`;
const selectedKeys = ref(['']);
const openKeys = ref<string[]>(['/qserver']);

const loading = ref(true);
const menusData = ref<any[]>([]);
loading.value = true;

onMounted(async () => {
  const createGroup = (label: string) => ({
    label,
    key: '',
    type: 'group',
  });
  menusData.value.push(createGroup('量化'));
  menusData.value.push(...routeConfig.map((i: { menu: any[]; }) => i.menu[0]));
  console.log(menusData.value);
});
const handleSetTitle = (key: string) => {
  const current = menusData.value.find((i) => i.key && key.includes(i.key)) || {
    label: '',
  };
  console.log(key, current);
  const currentTitle = ['/quantify'].includes(key) ? '量化' : current.label;
  document.title = `${current?.label} - ${currentTitle}`;
  selectedKeys.value = menusData.value
    .filter((i) => key.includes(i.key))
    .map((i) => i.key);
};
const handleClick = (e: any) => {
  console.log(e);

  handleSetTitle(e.key);
  router.push({ path: e.key as string });
};
watchEffect(() => {
  handleSetTitle(route.path);
});
</script>
<style lang="less">
body {
  background-color: var(--color-bg2);
}
#app {
  padding: 0 20px;
  margin: auto;
}

.ant-menu-light.ant-menu-root.ant-menu-inline {
  border: none;
}
.ant-menu-light.ant-menu-root.ant-menu-vertical {
  border: none;
}
.ant-menu-light.ant-menu-inline .ant-menu-item {
  border-radius: 4px;
  margin-right: 16px;
  margin-left: 0;
  padding-left: 12px !important;
  width: calc(100% - 16px);
  height: 36px;
  line-height: 36px;
}
.ant-menu-item {
  position: relative;
  &::before {
    content: '';
    width: 4px;
    border-radius: 3px;
    height: 18px;
    display: block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.1s;
  }
}
.ant-menu-item.ant-menu-item-selected {
  font-weight: 500;
  background-color: var(--color-bg1);
  &::before {
    background-color: var(--color-primary);
  }
}
.ant-menu .ant-menu-item-group-title {
  font-size: 12px;
  padding: 8px 12px 4px;
  color: var(--color-text3);
}
.ant-layout .ant-layout-sider-trigger {
  background-color: #fbfbfb;
  color: var(--color-text1);
  border: 1px solid var(--color-border-regular);
}
</style>
<style lang="less" scoped>
.collapsedButton {
  position: absolute;
  inset-block-end: 14px;
  z-index: 11;
  width: 28px;
  height: 28px;
  text-align: center;
  border-radius: 14px;
  inset-inline-end: -13px;
  color: var(--color-text2);
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--color-bg1);
  border: 1px solid var(--color-border-regular);
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05),
    0 1px 4px -1px rgba(25, 15, 15, 0.07), 0 0 1px 0 rgba(0, 0, 0, 0.08);
}
.my-layout {
  min-height: 100vh;
}
.my-header {
  line-height: normal;
  height: 46px;
  padding: 0;
}
.my-content {
  width: 100%;
  margin: 0 auto;
  padding: 60px 0 16px 0;
}
.my-header-fixed {
  position: fixed;
  width: 100%;
  z-index: 10;
  background-color: var(--color-bg1);
  inset-block-start: 0;
  inset-inline-end: 0;
  border-block-end: 1px solid var(--color-border-regular);
}
.my-sider {
  background: none;
  margin-right: 16px;
  .my-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
.my-sider-fixed {
  height: calc(100% - 78px);
  inset-block-start: 62px;
  position: fixed !important;
  z-index: 100;
  border-inline-end: 1px solid var(--color-border-regular);
}
</style>

