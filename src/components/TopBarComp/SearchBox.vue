<template>
    <el-popover trigger="click" placement="bottom-end" width="550px" class="icon" @before-enter="searchText = ''">
        <template #reference>
            <el-icon :size="25" class="icon">
                <search />
            </el-icon>
        </template>
        <el-input v-model="searchText" v-show="route.fullPath === '/moviedb' || route.fullPath === '/persondb'" size="large" class="search">
            <template #prepend>
                <span v-if="route.fullPath === '/moviedb'">搜索电影</span>
                <span v-else>搜索影人</span>
            </template>
            <template #append>
                <el-button :icon="ElSearch" @click="doSearch()">搜索</el-button>
            </template>
        </el-input>
        搜索后在这里显示结果或空
    </el-popover>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { Search } from '@icon-park/vue-next'
import { Search as ElSearch } from '@element-plus/icons-vue';
import { ref } from 'vue';

const route = useRoute()

const searchText = ref('')

const doSearch = () => {
    // 调用对应搜索API
    console.log("search")
}
</script>

<style scoped>
.icon{
    margin-right: 16px;
}
</style>