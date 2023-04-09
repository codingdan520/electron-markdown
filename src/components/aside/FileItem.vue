<script setup lang="ts">
import { Document, Edit, Delete } from '@element-plus/icons-vue';
import type { IfileList } from '@/types/fileList';

const props = defineProps<{
  active: boolean;
  file: IfileList;
}>();

const emit = defineEmits<{
  (e: 're-name', file: IfileList): void;
  (e: 'delete-file', fileId: string): void;
}>();

const deletFile = () => {
  const {
    file: { id },
  } = props;
  emit('delete-file', id);
};

const reName = () => {
  const { file } = props;
  emit('re-name', file);
};
</script>

<template>
  <el-row class="file-item" :class="{ actived: active }">
    <el-col :span="3">
      <el-icon><Document /></el-icon>
    </el-col>
    <el-col :span="15">
      <div class="text">{{ file.title }}</div>
    </el-col>
    <el-col :span="3" @click.stop="reName">
      <el-icon><Edit /></el-icon>
    </el-col>
    <el-col :span="3" @click.stop="deletFile">
      <el-icon><Delete /></el-icon>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.file-item {
  padding: 0 5px;
}
.text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 10px;
}
.actived {
  background-color: #b8dec6;
}
</style>
