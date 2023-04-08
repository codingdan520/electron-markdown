<script setup lang="ts">
import { CircleCloseFilled, QuestionFilled } from '@element-plus/icons-vue';
import type { IfileList } from '@/types/fileList';
const props = defineProps<{
  activeId: string; // 正在编辑的文档
  openFiles: IfileList[]; // 打开的文档
  unSavedIds: string[];
}>();
const emit = defineEmits<{
  (e: 'toggle-tab', id: string, preId: string): void;
  (e: 'close-tab', id: string): void;
}>();
const toggleTab = (id: string, preId: string) => {
  emit('toggle-tab', id, preId);
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
      @click="toggleTab(item.id, activeId)"
    >
      <span class="text">{{ item.title }}</span>
      <div class="icon-box">
        <el-icon class="unSaved" color="#999"><QuestionFilled /></el-icon>
        <el-icon
          class="close"
          color="#999"
          :class="{ 'show-close': activeId === item.id }"
          @click.stop="closeTab(item.id)"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.tabs {
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #b8dec6;
  .tabs-item {
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid #ccc;
    user-select: none;
    .icon-box {
      width: 16px;
      height: 16px;
    }
    &:hover > .icon-box .close {
      display: block;
    }
    .text {
      margin-right: 10px;
    }
    .close {
      display: none;
    }
    .show-close {
      display: block;
    }
  }
  .active {
    background-color: #fff;
  }
}
</style>
