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
    if (props.show) {
      input.value.focus();
    } else {
      searchValue.value = '';
    }
  }
);

const search = (e: KeyboardEvent) => {
  if (e.code === 'Escape') {
    emit('close');
    return;
  }
  if (props.isValidate && !searchValue.value.trim()) {
    // eslint-disable-next-line no-undef
    ElMessage({
      message: '请输入文本后再按 enter 键！',
      type: 'warning',
    });
    return;
  }
  if (e.code === 'Enter') {
    emit('search', searchValue.value.trim());
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
      @keyup.enter.esc="(e: KeyboardEvent) => {search(e)}"
      @click="(e:Event) => e.stopPropagation()"
    />
    <el-icon color="red" size="16" @click.stop="emit('close')">
      <Close />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.create {
  width: 100%;
  height: 100%;
}
.el-input {
  flex: 1;
  margin-left: 5px;
}
.el-icon {
  width: 40px;
  cursor: pointer;
}
</style>
