<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import EditInput from '@/components/aside/EditInput.vue';

withDefaults(defineProps<{
    title?: string
}>(), {
    title: '我的文档'
})


const emit = defineEmits<{
    (e: 'search', value: string): void
}>()

const searchActive = ref(false);

const toggleSearch = async () => {
    searchActive.value = true;
}

const close = () => {
    searchActive.value = false;
}

const search = (vlaue: string) => {
    emit('search', vlaue);
    close();
}
</script>

<template>
    <div class="search-box">
        <div class="text flex-between" v-show="!searchActive">
            <span>{{ title }}</span>
            <el-icon 
                size="20"
                @click="toggleSearch()"
            >
                <Search />
            </el-icon>
        </div>
        <EditInput
            v-show="searchActive"
            :show="searchActive"
            :is-validate="false"
            @search="search"
            @close="close"
        />
    </div>
</template>

<style scoped lang="scss">
.search-box {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    .text {
        & > :last-child {
            cursor: pointer;
        }
    }
    .el-icon {
        width: 40px;
    }
}
</style>