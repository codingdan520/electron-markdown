<script setup lang="ts">
import { CircleCloseFilled } from '@element-plus/icons-vue';
import type { IfileList } from '@/types/fileList';
const props = defineProps<{
  activeId: string; // 正在编辑的文档
  openFiles: IfileList[]; // 打开的文档
  unSaveIds: string[]; // 未保存的文档
}>();
console.log(props.unSaveIds);
const emit = defineEmits<{
  (e: 'toggle-tab', id: string): void;
  (e: 'close-tab', id: string): void;
}>();
const toggleTab = (id: string) => {
  emit('toggle-tab', id);
};
const closeTab = (id: string) => {
  emit('close-tab', id);
};
</script>

<template>
  <ul class="tabs">
    <li
      v-for="item in openFiles"
      :key="item.id"
      class="tabs-item"
      :class="{ active: activeId === item.id }"
      @click="toggleTab(item.id)"
    >
      <span class="text">{{ item.title }}</span>
      <span class="radius" :class="{ 'show-radius': unSaveIds.includes(item.id) }"></span>
      <el-icon class="close" :class="{ 'show-close': unSaveIds.includes(item.id) }" @click.stop="closeTab(item.id)"
        ><CircleCloseFilled
      /></el-icon>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.tabs {
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #eee;
  .tabs-item {
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid #ccc;
    user-select: none;
    &:hover > .radius {
      display: none;
    }
    &:hover > .close {
      display: block;
    }
    .text {
      margin-right: 10px;
    }
    .radius {
      display: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #999;
    }
    .show-radius {
      display: block;
    }
    .close {
      display: none;
    }
  }
  .active {
    background-color: #fff;
  }
}
</style>
