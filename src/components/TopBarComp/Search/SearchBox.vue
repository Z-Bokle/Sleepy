<template>
    <el-popover trigger="click" placement="bottom-end" width="550px" class="icon" @before-enter="searchText = ''" v-if="route.fullPath === '/moviedb' || route.fullPath === '/persondb'" >
        <template #reference>
            <el-icon :size="25" class="icon" @click="init()">
                <search />
            </el-icon>
        </template>
        <el-input v-model="searchText" size="large" class="search" clearable>
            <template #prepend>
                <span v-if="route.fullPath === '/moviedb'">搜索电影</span>
                <span v-else>搜索影人</span>
            </template>
            <template #append>
                <el-button :icon="ElSearch" @click="doSearch()">搜索</el-button>
            </template>
        </el-input>
        <div class="result">
            <el-empty v-if="isEmpty" description="未搜索到结果" /> 
            <search-result v-for="item in result" :img="item.img" :id="item.id">
                <template #text>{{ item.text }}</template>
                <template #extra>{{ item.extra }}</template>
            </search-result>
        </div>
    </el-popover>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { Search } from '@icon-park/vue-next'
import { Search as ElSearch } from '@element-plus/icons-vue';
import { ref } from 'vue';
import SearchResult from './SearchResult.vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const route = useRoute()

const searchText = ref('')

const isEmpty = ref(false)

const result = ref<{text: string, extra: string, id: number, img: string}[]>([])

const url = new Map<string, string>([
    ['/moviedb', '/search/movie'],
    ['/persondb', '/search/person']
])

const doSearch = () => {
    axios({
        method: 'get',
        url: url.get(route.fullPath),
        params: {
            wd: searchText.value
        }
    })
    .then((res) => {
        if(res.data.status === 0) {
            isEmpty.value = (res.data.data.length === 0)
            return res.data.data
        } else {
            ElMessage(res.data.msg)
        }
    })
    .then((list) => {
        result.value = []
        if(route.fullPath === '/moviedb')
            list.forEach((e: { name: string; year: string; country: { name: string; }; img: string; id: number; }) => {
                result.value.push({
                    text: `${e.name}(${e.year})`,
                    extra: e.country.name,
                    img: e.img,
                    id: e.id
                })
            })
        
        if(route.fullPath === '/persondb')
            list.forEach((e: { name: string; birthplace: string; id: number; img: string; }) => {
                result.value.push({
                    text: e.name,
                    extra: e.birthplace,
                    img: e.img,
                    id: e.id
                })
            })
    })
}

const init = () => {
    searchText.value = ""
    result.value = []
}
</script>

<style scoped>
.icon{
    margin-right: 16px;
}
.result {
    margin-top: 20px;
}
</style>