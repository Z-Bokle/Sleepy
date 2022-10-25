<template>
    <div class="container">
        <el-row :gutter="30">
            <el-col :span="4">
                <div class="poster-container" ref="container">
                    <el-image :src="movieDetail.img" referrerpolicy="no-referrer" class="poster" draggable="false" />
                </div>
                <div class="like" v-if="store.state.account.login"><like-selector></like-selector></div>
                <div class="like" v-else><el-card>请登录后查看喜好</el-card></div>
            </el-col>
            <el-col :span="15">
                <div class="desc">
                    <el-descriptions direction="vertical">
                        <template #title>
                            <span class="title">{{ movieDetail.name }}</span>
                            <el-button 
                                type="plain" 
                                :icon="Share"
                                circle 
                                :disabled="!isSupported"
                                @click="share(shareOptions)"
                                class="share-button"
                                />
                        </template>
                        <template #extra>
                            <span class="year">{{ movieDetail.year }}</span>
                        </template>
                        <el-descriptions-item label="评分" :min-width="200">
                            <el-rate
                                v-model="viewRating"
                                size="large"
                                disabled
                                :border="true"
                                :colors="colors"
                            />
                            <span class="rate-text">{{ movieDetail.rating }}分</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="类型">
                            {{ genres }}
                        </el-descriptions-item>
                        <el-descriptions-item label="国家/地区">
                            {{ countrires }}
                        </el-descriptions-item>
                        <el-descriptions-item label="标签" :span="1">
                            <el-tag v-for="tag in movieDetail.tags" class="tag">{{ tag }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="简介" :span="2">
                            <el-scrollbar :always="true">
                                <div class="desc-text">
                                    {{ movieDetail.desc }}
                                </div>                                
                            </el-scrollbar>
                        </el-descriptions-item>
                        <el-descriptions-item label="演职员">
                            <el-scrollbar>
                                <div class="scrollbar-content">
                                    <person-item-mini
                                        v-for="person in persons"
                                        :name="person.name"
                                        :img="person.img"
                                        :role="person.role"
                                        :id="person.id"
                                        class="scrollbar-item"
                                    >
                                    </person-item-mini>
                                </div>
                            </el-scrollbar>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="similar">相似</div>
            </el-col>
        </el-row>
    </div>

</template>

<script lang="ts" setup>
import { useParallax, useShare } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Share } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
import PersonItemMini from './PersonItemMini.vue';
import LikeSelector from './LikeSelector.vue'
import axios from 'axios';

const route = useRoute()
const store = useStore()

// rate组件使用的颜色
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])

//用于rate组件展示的分数，并非实际分数
const viewRating = computed(() => movieDetail.value.rating / 2)

const movieDetail = ref({
    name: '',
    img: '',
    year: 0,
    rating: 0,
    tags: [''],
    desc: '',
    genre: [{id: 0, name: ''}],
    country: [{id: 0, name: ''}]
})

const genres = computed(() => {
    let array:Array<string> = [];
    movieDetail.value.genre.forEach((element) => array.push(element.name))
    return array.join('/')
})

const countrires = computed(() => {
    let array:Array<string> = [];
    movieDetail.value.country.forEach((element) => array.push(element.name))
    return array.join('/')
})

const persons = ref<{
    name: string;
    img: string;
    role: string;
    id: number;
}[]>([])

onMounted(() => {
    // 从路由中获取的字段
    const movieID = route.params['movieid']
    // ajax从服务端获取details和persons
    
    axios({
        method: 'get',
        url: `/movie/${movieID}/details`,
    })
    .then((res) => {
        movieDetail.value = res.data.data
    })

    axios({
        method: 'get',
        url: `/movie/${movieID}/persons`
    })
    .then((res) => {
        let array = res.data.data
        array.forEach((element: { person: { name: any; img: any; id: number }; role: any; }) => {
            persons.value.push({
                name: element.person.name,
                img: element.person.img,
                role: element.role,
                id: element.person.id
            })            
        });

    })

})

// 分享功能
const shareOptions = {
    title: `Sleepy电影推荐`,
    text: `为你推荐一部评分为${movieDetail.value.rating}的电影 ${movieDetail.value.name}!`,
    url: route.fullPath
}
const { isSupported, share } = useShare()

// 海报放大动效
const container = ref(null)
const { tilt, roll, source } = useParallax(container)

const posterCSSTransform = computed(() => {
    return `rotateX(${roll.value * 55}deg) rotateY(${tilt.value * 55}deg) scale(1.1, 1.1)`
})

const posterCSSFilter = computed(() => {
    return `brightness(${(roll.value + 1)})`
})

</script>

<style scoped>
.container {
    height: 80vh;
    width: 100%;
}
.poster-container {
    height: 33vh;   
}

.poster-container:hover .poster {
    transition: .1s ease all;
    transform: v-bind('posterCSSTransform');
    filter: v-bind(posterCSSFilter);
    box-shadow: 5px 5px 2px #999999;
}
.like {
    height: 40vh;
    margin-top: 8vh;
}
.desc {
    height: 100%;
}
.similar {
    height: 100%;
    background-color: lightgreen;
}
@font-face {
    font-family: 'MiSans';
    src: url('../../../assets/fonts/MiSans-Normal.ttf');
}
@font-face {
    font-family: 'MiSans-SemiBold';
    src: url('../../../assets/fonts/MiSans-SemiBold.ttf');
}
.title {
    font-size: 2.4em;
    font-family: MiSans-SemiBold;
}
.year {
    font-size: 2em;
    font-family: MiSans;
}
.rate-text {
    font-size: 1.4em;
    font-family: MiSans-SemiBold;
    margin-left: 5px;
}
.tag {
    margin-top: 5px;
    margin-right: 5px;
}
.scrollbar-content {
    display: flex;
    max-width: 100px;
}
.scrollbar-item {
    display: flex;
    flex-shrink: 0;
    margin-left: 10px;
}
.desc-text {
    max-height: 70px;
}
.share-button {
    margin-left: 20px;
    margin-bottom: 20px;
}
</style>