<script setup lang="ts">
import zhCN from 'ant-design-vue/lib/locale/zh_CN';
import { theme } from 'ant-design-vue';

const themeConfig = {
  token: {
    colorPrimary: '#22B0BE',
    colorInfo: '#22B0BE',
    algorithm: theme.compactAlgorithm,
    borderRadius: 8,
  },
}
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="themeConfig">
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
