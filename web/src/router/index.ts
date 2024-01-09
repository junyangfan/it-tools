import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/views/Layout/index.vue';
import { HomeOutlined, PictureOutlined } from '@ant-design/icons-vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: {
      title: '首页',
      singleMenu: true,
      icon: HomeOutlined,
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/index.vue'),
      },
    ],
  },
  {
    path: '/tools',
    redirect: '/bill/image-compress',
    component: Layout,
    meta: {
      title: '图片工具',
      icon: PictureOutlined,
    },
    children: [
      {
        path: 'image-convert',
        meta: { title: '图片转换' },
        component: () => import('@/views/ImageConvert/index.vue'),
      },
      {
        path: 'image-compress',
        meta: { title: '图片压缩' },
        component: () => import('@/views/ImageCompress/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  next();
});

export default router;
