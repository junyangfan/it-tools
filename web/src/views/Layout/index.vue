<script lang="ts">
export default {
  name: 'Layout',
};
</script>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { routes } from '@/router';
import { cloneDeep } from 'lodash';
import {
  useRoute,
  RouteRecordRaw,
} from 'vue-router';
import { getData } from '@/utils';

const route = useRoute();
const collapsedCol = ref<boolean>(false);
const openKeys = ref<string[]>([])
const redirectRoutePath = ['/', '/home']
const selectedKeys = ref<string[]>([])
const showRoutes = computed(() => {
  const handleRoutes: RouteRecordRaw[] = cloneDeep(routes) || [];
  return handleRoutes?.filter(({ meta }) => !meta?.hidden);
});
const initPage = () => {
  if (!route.meta?.singleMenu) {
    const path = (route.path.match(/^(\/[a-z-]+)\/[\s\S]*/i) || [])[1] || '';
    openKeys.value.push(path);
  }
  if (redirectRoutePath.includes(route.path)) {
    selectedKeys.value.push(...redirectRoutePath)
  }
  else {
    selectedKeys.value.push(route.path)
  }
};

const breadCrumb = computed<Array<{ title: string | unknown; path: string }>>(() => {
  const path = route.path
  const routeConfig = (route.matched || []).find((i) => i.children)
  // 一级菜单
  if (routeConfig?.meta?.singleMenu) {
    return [{ title: routeConfig.meta?.title ?? '', path: routeConfig.path }]
  }
  // 二级菜单
  const levelRouteConfig = (routeConfig?.children || []).find((i) => path.endsWith(i.path))
  return [
    { title: routeConfig?.meta.title ?? '', path: routeConfig?.path ?? '' },
    { title: levelRouteConfig?.meta?.title ?? '', path: `${routeConfig?.path ?? ''}/${levelRouteConfig?.path ?? ''}` },
  ]
})

onMounted(() => {
  initPage()
})
</script>

<template>
  <a-layout class="layout_container">
    <!-- 左侧菜单 -->
    <a-layout-sider
      v-model:collapsed="collapsedCol"
      :trigger="null"
      theme="light"
      collapsible
      class="layout_aside"
    >
      <!-- 标头 -->
      <div class="sider_title">
        <a-typography-text>IT工具箱</a-typography-text>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="inline"
        :openKeys="openKeys"
      >
        <template v-for="route in showRoutes" :key="route.path">
          <!-- 多级菜单 -->
          <template v-if="!route.meta?.singleMenu">
            <a-sub-menu :key="route.path">
              <template #icon v-if="route.meta?.icon">
                <component :is="route.meta?.icon" />
              </template>
              <template #title>
                <span>
                  {{ route.meta?.title }}
                </span>
              </template>
              <template
                v-for="subRoute in route.children || []"
                :key="subRoute.path"
              >
                <a-menu-item
                  v-if="!subRoute.meta?.hideInMenu"
                  :key="`${route.path}/${subRoute.path}`"
                >
                  <router-link :to="`${route.path}/${subRoute.path}`">
                    {{ subRoute.meta?.title }}
                  </router-link>
                  <template #icon v-if="subRoute.meta?.icon">
                    <component :is="subRoute.meta?.icon" />
                  </template>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
          <!-- 一级菜单 -->
          <template v-else>
            <a-menu-item :key="route.path">
              <router-link :to="route.path">{{
                route.meta?.title
              }}</router-link>
              <template #icon v-if="route.meta?.icon">
                <component :is="route.meta?.icon" />
              </template>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <!-- 右侧内容 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="content_header">
        <div class="content_header_left">
          <!-- 展开收起图标 -->
          <menu-unfold-outlined
            v-if="collapsedCol"
            class="trigger"
            @click="() => (collapsedCol = !collapsedCol)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsedCol = !collapsedCol)"
          />
          <!-- 路径 -->
          <a-breadcrumb :style="{ margin: '0 16px' }">
            <a-breadcrumb-item v-for="i in breadCrumb" :key="i.path">
              <router-link :to="i.path">{{ i.title }}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <a-space>
          <a-typography-link href="https://blog.fanjunyang.zone" target="_blank">
            俊阳IT知识库
          </a-typography-link>
          <a-divider type="vertical" />
          <a-typography-link href="https://drive.fanjunyang.zone" target="_blank">
            云盘
          </a-typography-link>
        </a-space>
      </a-layout-header>
      <!-- 主内容 -->
      <a-layout-content class="layout_main_content">
        <!-- 路由插槽 -->
        <div class="main_content_slot">
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path" />
          </router-view>
        </div>
      </a-layout-content>
      <!-- 底部 -->
      <a-layout-footer style="text-align: center; padding: 8px 50px">
        <a-typography-link href="https://blog.fanjunyang.zone" target="_blank">
          Copyright © {{ getData('YYYY') }} 俊阳IT知识库
        </a-typography-link>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.sider_title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  height: 50px;
}
.content_header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .content_header_left {
    display: flex;
    align-items: center;
  }
}

.layout_main_content {
  margin: 16px 16px 0;
  background: #ffffff;
  overflow: auto;

  .main_content_slot {
    padding: 16px 16px 0;
    position: relative;
  }
}
:deep(.ant-layout-header) {
  background: #fff;
  display: flex;
  padding: 0 18px !important;
  height: 50px;
}
.layout_container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: auto;
}
.layout_aside {
  color: rgba(255, 255, 255, 0.65);
  overflow: auto;
}
</style>
