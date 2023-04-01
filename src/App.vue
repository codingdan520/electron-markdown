<script setup lang="ts">
import { ref, nextTick, computed, watch, toRaw } from 'vue';
import { v4 as uuid } from 'uuid';
import SearchFile from '@/components/aside/SearchFile.vue';
import FileList from '@/components/aside/FileList.vue';
import fileListData from '@/mock/initFiles';
import ButtonGroup from '@/components/aside/ButtonGroup.vue';
import Tabs from '@/components/content/Tabs.vue';
import Editor from '@/components/content/Editor.vue';
import type { IfileList } from './types/fileList';

// 导入 electron 暴露的 api
const { electronAPI } = window;

let activeId = ref('');
let searchRef = ref();
let fileList = ref<IfileList[]>(fileListData);
let searchFileList = ref<IfileList[]>([]);

watch(activeId, (curent: string) => {
  const content = getActiveMarkdowContent(curent);
  setHtml(content);
});

const showFileList = computed(() => {
  return searchFileList.value.length ? searchFileList.value : fileList.value;
});

const searchFile = (value: string) => {
  if (!value) {
    searchFileList.value = [];
    return;
  }
  searchFileList.value = fileList.value.filter((item) => item.title.includes(value));
};

const deleteFile = (fileId: string) => {
  fileList.value = fileList.value.filter((item) => item.id !== fileId);
  // 修复搜索情况下删除bug
  searchFileList.value = searchFileList.value.filter((item) => item.id !== fileId);
  closeTab(fileId);
  // 修复只有一个展示项时，关闭搜索框
  if (searchFileList.value.length === 0) {
    searchRef.value.close();
  }
};

const savedFile = (id: string, value: string) => {
  fileList.value.forEach(async (item) => {
    try {
      if (item.id === id) {
        const res = await electronAPI.savedFile(toRaw(item), value);
        console.log(res);
        item.title = value;
        item.isNew = false;
        throw new Error();
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  });
};

const createFile = () => {
  // 判断是否已经有新建文件
  const onceFileFlag = fileList.value.find((item) => item.isNew);
  if (onceFileFlag) {
    return;
  }
  // 新建文档时，关闭搜索 bug
  searchRef.value.close();
  const newFile: IfileList = {
    id: uuid(),
    isNew: true,
    title: '',
    body: '## 初始化内容',
    createTime: new Date().getTime().toString(),
  };
  fileList.value.push(newFile);
};

const exportFile = async () => {
  // const res = await electronAPI.getFilePath();
  // console.log(res);
};

// 编辑器
const editorRef = ref();
// 打开的文件
const openFileIds = ref<string[]>([]);

// 为 markdown 传输文案
const setHtml = async (value: string) => {
  await nextTick();
  editorRef?.value?.initHtml(value);
};

// 计算打开的文档
const openFiles = computed(() => {
  const targetFiles: IfileList[] = [];
  openFileIds.value.forEach((id) => {
    fileList.value.forEach((item) => {
      if (item.id === id) {
        targetFiles.push(item);
      }
    });
  });
  return targetFiles;
});

// 获取正在编辑的 markdown 文案
const getActiveMarkdowContent = (id: string): string => {
  return fileList.value.filter((item) => item.id === id)[0]?.body;
};

// 切换 markdown tabs
const toggleTab = (id: string, preId: string) => {
  if (activeId.value === id) return;
  // 切换时保存上一个文件
  saveMarkdown(preId);
  activeId.value = id;
  const valueHtml = fileList.value.filter((item) => item.id === activeId.value)[0]?.body;
  setHtml(valueHtml);
};

// 关闭 markdown
const closeTab = (id: string) => {
  // 关闭前保存文本
  saveMarkdown(id);
  // 在最后一个选项时关闭markdown，需要跳转到前一个选项
  if (openFileIds.value.length > 1 && id === activeId.value) {
    // 获取关闭的索引 index
    const index = openFileIds.value.findIndex((item) => item === id);
    // 如果在第一项，就往后走一个索引
    activeId.value = openFileIds.value[index === 0 ? 1 : index - 1];
  }
  openFileIds.value = openFileIds.value.filter((fileId: string) => fileId !== id);
};

const saveMarkdown = (id: string) => {
  const value: string = editorRef.value.getText();
  fileList.value.forEach((item) => {
    if (item.id === id) {
      item.body = value;
    }
  });
};

// 点击文件名称加载右侧 markdown
const showMarkdown = (id: string) => {
  activeId.value = id;
  if (openFileIds.value.includes(id)) return;
  openFileIds.value.push(id);
};
</script>

<template>
  <el-row class="container">
    <el-col :span="6" class="aside">
      <div class="up">
        <SearchFile ref="searchRef" title="我的文档" @search="searchFile" />
        <FileList
          :active-id="activeId"
          :file-list="showFileList"
          @delete-file="deleteFile"
          @re-name="savedFile"
          @show-markdown="showMarkdown"
        />
      </div>
      <div class="down">
        <ButtonGroup @create-file="createFile" @export-file="exportFile" />
      </div>
    </el-col>
    <el-col :span="18" class="content">
      <div v-if="openFileIds.length">
        <Tabs :open-files="openFiles" :active-id="activeId" @toggle-tab="toggleTab" @close-tab="closeTab" />
        <Editor ref="editorRef" />
      </div>
      <div v-else class="empty-text">新建或者导入具体文档</div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  .aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #e3f2d6;
    box-shadow: 2px 2px 1px 0px #b8dec6;
  }
  .content {
    flex: 1;
    .empty-text {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      color: #ccc;
    }
  }
}
</style>
