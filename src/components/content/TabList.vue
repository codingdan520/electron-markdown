<script setup lang="ts">
import { ref } from 'vue';
import type { IfileList } from '@/types/fileList';
import Editor from '@/components/content/Editor.vue';

const props = defineProps<{
  fileList: IfileList[];
}>();

let activeId = ref('1');
const editorRef = ref();

const removeTab = (targetName: string) => {
  console.log(targetName);
  editorRef.value.initHtml(targetName);
};
</script>

<template>
  <el-tabs v-model="activeId" type="card" class="demo-tabs" closable @tab-remove="removeTab">
    <el-tab-pane v-for="item in fileList" :key="item.id" :label="item.title" :name="item.id"></el-tab-pane>
  </el-tabs>
  <Editor ref="editorRef" />
</template>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  box-sizing: border-box;
  height: 40px;
  .el-tabs__item {
    height: 40px;
  }
}
</style>
