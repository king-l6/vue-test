<template>
  <a-button @click="showConfirm">
    <slot>确认操作</slot>
  </a-button>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '确认操作',
  },
  content: {
    type: String,
    default: '确定要执行此操作吗？',
  },
  okText: {
    type: String,
    default: '确定',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  onConfirm: {
    type: Function,
    required: true,
  },
});

const loading = ref(false);

const showConfirm = () => {
  Modal.confirm({
    title: props.title,
    content: props.content,
    okText: props.okText,
    cancelText: props.cancelText,
    onOk: async () => {
      loading.value = true;
      try {
        await props.onConfirm();
      } finally {
        loading.value = false;
      }
    },
    okButtonProps: {
      loading: loading.value,
    },
  });
};
</script>

