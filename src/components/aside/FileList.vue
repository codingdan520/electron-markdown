<script setup lang="ts">
import type { IfileList } from '@/types/fileList';
import FileItem from '@/components/aside/FileItem.vue';
import EditInput from '@/components/aside/EditInput.vue';
import { ref } from 'vue';
const props = defineProps<{
  fileList: IfileList[];
}>();

const activeId = ref<boolean | string>(false);

const emit = defineEmits<{
  (e: 'edit-file', fileId: string, value: string): void;
  (e: 'delete-file', fileId: string): void;
}>();

const deleteFile = (fileId: string) => {
  emit('delete-file', fileId);
};

const editFile = (file: IfileList) => {
  activeId.value = file.id;
};

const close = () => {
  activeId.value = false;
};
const submitEdit = (id: string, value: string) => {
  emit('edit-file', id, value);
  close();
};
</script>

<template>
  <ul class="file-list">
    <li v-for="item in fileList" :key="item.id">
      <EditInput
        v-show="activeId === item.id"
        :show="activeId === item.id"
        @close="close"
        @search="
          (value) => {
            submitEdit(item.id, value);
          }
        "
      />
      <FileItem v-show="activeId !== item.id" :file="item" @delete-file="deleteFile" @edit-file="editFile" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.file-list {
  margin-top: 10px;

  li {
    height: 40px;
    line-height: 40px;
  }
}
</style>
