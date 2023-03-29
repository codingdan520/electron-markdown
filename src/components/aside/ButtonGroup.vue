<script setup lang="ts">
import { Plus, Upload } from '@element-plus/icons-vue';
const emit = defineEmits<{
  (e: 'create-file'): void;
  (e: 'export-file'): void;
}>();
</script>

<template>
  <div class="button-group">
    <el-button @click="emit('create-file')">
      <el-icon><Plus /></el-icon>
      新建
    </el-button>
    <el-button @click="emit('export-file')">
      <el-icon><Upload /></el-icon>
      导入
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.button-group {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-button {
    height: 100%;
    flex: 1;
    margin-left: 0;
    background-color: #b8dec6;
    .el-icon {
      margin-right: 5px;
    }
  }
}
</style>
