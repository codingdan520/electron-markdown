<script setup lang="ts">
import { ref } from 'vue';
import SearchFile from '@/components/aside/SearchFile.vue';
import FileList from '@/components/aside/FileList.vue';
import fileListData from '@/mock/initFiles';
import ButtonGroup from '@/components/aside/ButtonGroup.vue';

let fileList = ref(fileListData);

const searchFile = (value: string) => {
  console.log(value);
  fileList.value = fileList.value.filter((item) => item.title.includes(value));
};

const deleteFile = (fileId: string) => {
  fileList.value = fileList.value.filter((item) => item.id !== fileId);
};

const editFile = (id: string, value: string) => {
  console.log(id, value);
  fileList.value.forEach((item) => {
    try {
      if (item.id === id) {
        item.title = value;
        throw new Error();
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  });
};

const createFile = () => {
  console.log(1);
};
const exportFile = () => {
  console.log(2);
};
</script>

<template>
  <el-row class="container">
    <el-col :span="6" class="aside">
      <div class="up">
        <SearchFile title="我的文档" @search="searchFile" />
        <FileList :file-list="fileList" @delete-file="deleteFile" @edit-file="editFile" />
      </div>
      <div class="down">
        <ButtonGroup @create-file="createFile" @export-file="exportFile" />
      </div>
    </el-col>
    <el-col :span="18" class="content"> 右侧 </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  .aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #e3f2d6;
  }
}
</style>
