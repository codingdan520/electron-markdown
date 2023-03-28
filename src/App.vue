<script setup lang="ts">
import { ref } from 'vue';
import SearchFile from '@/components/aside/SearchFile.vue';
import FileList from '@/components/aside/FileList.vue';
import fileListData from './mock/initFiles';
import type { IfileList } from '@/types/fileList';

let fileList = ref(fileListData);

const searchFile = (value: string) => {
  console.log(value);
  fileList.value = fileList.value.filter(item => item.title.includes(value));
  
}

const deleteFile = (fileId: string) => {
  fileList.value = fileList.value.filter(item => item.id !== fileId);
}

const editFile = (id: string, value: string) => {
  console.log(id, value);
  fileList.value.forEach(item => {
    try { 
      if (item.id === id) {
        item.title = value;
        throw new Error;
      }
    } catch(e) {}
  })
}

</script>

<template>
  <el-row class="container">
    <el-col :span="6" class="aside">
      <SearchFile @search="searchFile" title="我的文档" />
      <FileList 
        :fileList="fileList"
        @delete-file="deleteFile"
        @edit-file="editFile"
      />
    </el-col>
    <el-col :span="18" class="content">
      右侧
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  .aside {
    background-color: #e3f2d6;
    padding: 5px;
  }
}
</style>
