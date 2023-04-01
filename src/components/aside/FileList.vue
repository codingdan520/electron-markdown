<script setup lang="ts">
import type { IfileList } from '@/types/fileList';
import FileItem from '@/components/aside/FileItem.vue';
import EditInput from '@/components/aside/EditInput.vue';
import { ref } from 'vue';
const props = defineProps<{
  activeId: string;
  fileList: IfileList[];
}>();

const editTitleId = ref<boolean | string>(false);

const emit = defineEmits<{
  (e: 're-name', fileId: string, value: string): void;
  (e: 'delete-file', fileId: string): void;
  (e: 'show-markdown', fileId: string): void;
}>();

const deleteFile = (fileId: string) => {
  emit('delete-file', fileId);
};

const reName = (file: IfileList) => {
  editTitleId.value = file.id;
  // 如果存在正在新增的文件时，点击其他编辑，需要删除正在新增的文件
  const newFile = props.fileList.find((item) => item.isNew);
  newFile && emit('delete-file', newFile.id);
};

const close = (file?: IfileList) => {
  editTitleId.value = false;
  // 修复新建时，退出
  if (file?.isNew) {
    emit('delete-file', file.id);
  }
};

const submitReName = (id: string, value: string) => {
  let repeatFlag = props.fileList.find((item) => item.title === value);
  if (repeatFlag) {
    // eslint-disable-next-line no-undef
    ElMessage({
      message: '文件名已存在',
      type: 'warning',
    });
    return;
  }
  emit('re-name', id, value);
  close();
};

const showMarkdown = (id: string) => {
  editTitleId.value = false;
  emit('show-markdown', id);
};
</script>

<template>
  <ul class="file-list">
    <li v-for="item in fileList" :key="item.id" @click="showMarkdown(item.id)">
      <EditInput
        v-show="editTitleId === item.id || item.isNew"
        :show="editTitleId === item.id || item.isNew"
        @close="
          () => {
            close(item);
          }
        "
        @search="
          (value) => {
            submitReName(item.id, value);
          }
        "
      />
      <FileItem
        v-show="editTitleId !== item.id && !item.isNew"
        :active="activeId === item.id"
        :file="item"
        @delete-file="deleteFile"
        @re-name="reName"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.file-list {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  li {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
