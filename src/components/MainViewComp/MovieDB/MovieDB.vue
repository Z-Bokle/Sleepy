<template>
    <div class="items">
        <movie-item v-for="movie in movies" :movie-detail="movie" class="item"></movie-item>
    </div>
    <page-selector v-model="currentPage" :page-count="pageCount"></page-selector>

</template>

<script lang="ts" setup>
import MovieItem from "./MovieItem/MovieItem.vue";
import PageSelector from '../PageSelector.vue';
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";

const store = useStore()

const currentPage = ref(1);

const pageCount = ref(30);

const movies = ref<{
    id: number;
    img: string;
    name: string;
    year: number;
    tags: string[];
    desc: string;
}[]>()

// 初次获取数据

axios({
    method: 'get',
    url: '/movie/list',
    params: {
        page: currentPage.value,
        size: 12,
        sortby: store.state.movieFilter.sortby,
        genre: store.state.movieFilter.genres,
        country: store.state.movieFilter.countries,
        syear: store.state.movieFilter.movieYear[0],
        eyear: store.state.movieFilter.movieYear[1]
    }
})
.then((res) => {
    if (res.data.status === 0) {
        movies.value = res.data.data.list
        pageCount.value = res.data.data.total
    } else {
        ElMessage(res.data.msg)
    }
})

watch(() => [store.state.movieFilter,currentPage], (now, before) => {
    // 自动监听currentPage 以及 state.movieFilter
    // 完成自动刷新列表
    // 注意输入page-count
    axios({
        method: 'get',
        url: '/movie/list',
        params:{
            page: now[1].value,
            size: 12,
            sortby: now[0].sortby,
            genre: now[0].genres,
            country: now[0].countries,
            syear: now[0].movieYear[0],
            eyear: now[0].movieYear[1]
        }
    })
    .then((res) => {
    if (res.data.status === 0) {
        movies.value = res.data.data.list
        pageCount.value = res.data.data.total
    } else {
        ElMessage(res.data.msg)
    }
})
}, {deep: true})


</script>
<style scoped>
.items {
    max-height: 70vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>