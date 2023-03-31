<script setup lang="ts">
import { computed } from 'vue';
import { Document, Edit, Delete } from '@element-plus/icons-vue';
import type { IfileList } from '@/types/fileList';

const props = defineProps<{
  active: boolean;
  file: IfileList;
}>();

const emit = defineEmits<{
  (e: 'edit-file', file: IfileList): void;
  (e: 'delete-file', fileId: string): void;
}>();

const deletFile = () => {
  const {
    file: { id },
  } = props;
  emit('delete-file', id);
};

const editFile = () => {
  const { file } = props;
  emit('edit-file', file);
};
</script>

<template>
  <el-row class="file-item" :class="{ actived: active }">
    <el-col :span="3">
      <el-icon><Document /></el-icon>
    </el-col>
    <el-col :span="15">
      <span>{{ file.title }}</span>
    </el-col>
    <el-col :span="3" @click.stop="editFile">
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
.actived {
  background-color: #b8dec6;
}
</style>
