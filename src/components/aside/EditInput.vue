<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';
const props = withDefaults(
  defineProps<{
    show: boolean;
    isValidate?: boolean; // 是否需要校验非空文本
  }>(),
  {
    isValidate: true,
  }
);
const emit = defineEmits<{
  (e: 'search', value: string): void;
  (e: 'close'): void;
}>();

const searchValue = ref('');
const input = ref();

watch(
  () => props.show,
  () => {
    console.log(props.show);
    if (props.show) {
      input.value.focus();
    } else {
      searchValue.value = '';
    }
  }
);

const search = (e: KeyboardEvent) => {
  if (props.isValidate && !searchValue.value) {
    // eslint-disable-next-line no-undef
    ElMessage({
      message: '请输入文本后再按 enter 键！',
      type: 'warning',
    });
    return;
  }
  if (e.code === 'Enter') {
    emit('search', searchValue.value);
  }
  if (e.code === 'Escape') {
    emit('close');
  }
};
</script>

<template>
  <div class="create flex-between">
    <el-input
      ref="input"
      v-model="searchValue"
      placeholder="请输入文本后再按enter键"
      type="text"
      @keyup="(e: KeyboardEvent) => {search(e)}"
    />
    <el-icon color="red" size="16" @click="emit('close')">
      <Close />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.el-icon {
  width: 40px;
  cursor: pointer;
}
</style>
