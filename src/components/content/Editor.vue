<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick, watch } from 'vue';
import { DomEditor } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = ref<'default' | 'simple'>('default');

// 内容 HTML
const valueHtml = ref('');

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

const initHtml = (value: string) => {
  valueHtml.value = value;
};

// 获取非html文本
const getText = () => {
  return editorRef.value.getText();
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = async (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  await nextTick();
  // 查看已有配置
  // const toolbar = DomEditor.getToolbar(editor);
  // const curToolbarConfig = toolbar?.getConfig();
  // console.log(curToolbarConfig); // 当前菜单排序和分组
};

defineExpose({
  initHtml,
  valueHtml,
  getText,
});
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
    />
  </div>
</template>

<style scoped lang="scss"></style>
