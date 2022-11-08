<template>
    <el-collapse v-model="active" accordion @change="handleChange">
        <el-collapse-item title="最近作品" name="latest">
            <side-card v-for="item in lists.latest" :img="item.img" :name="item.name" :text="item.text" :id="item.id" :categories="item.categories" class="card"></side-card>
        </el-collapse-item>
        <el-collapse-item title="最受好评作品" name="top">
            <side-card v-for="item in lists.top" :img="item.img" :name="item.name" :text="item.text" :id="item.id" :categories="item.categories" class="card"></side-card>
        </el-collapse-item>    
        <el-collapse-item title="合作最多影人" name="partners">
            <side-card v-for="item in lists.partners" :img="item.img" :name="item.name" :text="item.text" :id="item.id" :categories="item.categories" class="card"></side-card>
        </el-collapse-item>
    </el-collapse>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import SideCard from './SideCard.vue';

const active = ref()

const route = useRoute()

const lists = ref<any>({
    latest:[],
    top:[],
    partners:[],
})

const handleChange = (activeName: string) => {
    if (activeName === "latest" && lists.value.latest.length === 0) {
        axios({
            method: 'get',
            url: `/person/${route.params['personid']}/latest`
        })
        .then((res) => {
            res.data.list.forEach((movie: { img: string; name: string; year: number; id: number; }) => {
                lists.value.latest.push({
                    img: movie.img,
                    name: movie.name,
                    text: `${movie.year}年上映`,
                    id: movie.id,
                    categories: "movie"
                })
            });
        })
    } else if (activeName === "top" && lists.value.top.length === 0) {
        axios({
            method: 'get',
            url: `/person/${route.params['personid']}/top`
        })
        .then((res) => {
            res.data.list.forEach((movie: { img: string; name: string; rating: number; id: number; }) => {
                lists.value.top.push({
                    img: movie.img,
                    name: movie.name,
                    text: `评分为${movie.rating}分`,
                    id: movie.id,
                    categories: "movie"
                })
            });
        })
    } else if (activeName === "partners" && lists.value.partners.length === 0) {
        axios({
            method: 'get',
            url: `/person/${route.params['personid']}/partners`
        })
        .then((res) => {
            res.data.list.forEach((movie: { img: string; name: string; times: number; id: number; }) => {
                lists.value.partners.push({
                    img: movie.img,
                    name: movie.name,
                    text: `一共合作了${movie.times}次`,
                    id: movie.id,
                    categories: "person"
                })
            });
        })
    }
}

onBeforeRouteUpdate((to, from) => {
    if(to.name !== 'PersonDetail') return
    lists.value.latest = []
    lists.value.top = []
    lists.value.partners = []
    active.value = null
})

</script>

<style scoped>
.card {
    margin-bottom: 10px;
}
</style>