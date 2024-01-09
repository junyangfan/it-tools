import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  base: '/', // 设置打包路径
  server: {
    https: false, // 是否开启 https
    port: 7777, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {},
  },
  build: {
    target: 'es2015', // 设置最终构建的浏览器兼容目标
    // sourcemap: false, // 构建后是否生成 source map 文件
    chunkSizeWarningLimit: 5000, //  chunk 大小警告的限制（以 kbs 为单位）
    reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console & debugger
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
