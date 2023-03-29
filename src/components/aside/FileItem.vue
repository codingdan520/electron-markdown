<script setup lang="ts">
import { Document, Edit, Delete } from '@element-plus/icons-vue';
import type { IfileList } from '@/types/fileList';

const props = defineProps<{
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
  <el-row>
    <el-col :span="3">
      <el-icon><Document /></el-icon>
    </el-col>
    <el-col :span="15">
      <span>{{ file.title }}</span>
    </el-col>
    <el-col :span="3" @click="editFile">
      <el-icon><Edit /></el-icon>
    </el-col>
    <el-col :span="3" @click="deletFile">
      <el-icon><Delete /></el-icon>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>
