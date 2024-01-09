<script lang="ts">
export default {
  name: 'ImageConvert',
};
</script>
<script setup lang="ts">
import { reactive } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';

interface State {
  fileList: any[];
}

const state = reactive<State>({
  fileList: [],
});

</script>

<template>
  <a-button :size="'size'">
    <template #icon>
      <UploadOutlined />
    </template>
    上传图片

  </a-button>
</template>

<style lang="less" scoped></style>
