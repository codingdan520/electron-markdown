<script setup lang="ts">
import 'md-editor-v3/lib/style.css';
import { ref, onMounted } from 'vue';
import MdEditor from 'md-editor-v3';
import type { ExposeParam, ToolbarNames } from 'md-editor-v3';
MdEditor.config({
  markedOptions: { breaks: false },
});

const emit = defineEmits<{
  (e: 'change-content', value: string): void;
  (e: 'saved-file-content', value: string): void;
}>();

const editorRef = ref<ExposeParam>();
const text = ref('');
const toolbars: ToolbarNames[] = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
];

const initText = (value: string) => {
  text.value = value;
};

defineExpose({
  initText,
});

const onSave = (v: string) => {
  emit('saved-file-content', v);
};
const onChange = (v: string) => {
  emit('change-content', v);
};
</script>

<template>
  <MdEditor ref="editorRef" v-model="text" :toolbars="toolbars" @on-save="onSave" @on-change="onChange" />
</template>

<style scoped lang="scss"></style>
