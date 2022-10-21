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
                                :disabled="!shareTool.isSupported"
                                @click="doShare()"
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
                            {{ movieDetail.genre }}
                        </el-descriptions-item>
                        <el-descriptions-item label="国家/地区">
                            {{ movieDetail.country }}
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

const route = useRoute()
const store = useStore()

// rate组件使用的颜色
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])

//用于rate组件展示的分数，并非实际分数
const viewRating = computed(() => movieDetail.value.rating / 2)

const movieDetail = ref({
    "id": 1291543,
    "name": "功夫",
    "year": 2004,
    "rating": 8.3,
    "img": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2219011938.webp",
    "tags": [
        "周星驰",
        "喜剧",
        "香港",
        "功夫",
        "动作",
        "香港电影",
        "搞笑",
        "经典"
    ],
    "desc": "1940年代的上海，自小受尽欺辱的街头混混阿星（周星驰）为了能出人头地，可谓窥见机会的缝隙就往里钻，今次他盯上行动日益猖獗的黑道势力“斧头帮”，想借之大名成就大业。阿星假冒“斧头帮”成员试图在一个叫“猪笼城寨”的地方对居民敲诈，不想引来真的“斧头帮”与“猪笼城寨”居民的恩怨。“猪笼城寨”原是藏龙卧虎之处，居民中有许多身怀绝技者（元华、梁小龙等），他们隐藏于此本是为远离江湖恩怨，不想麻烦自动上身，躲都躲不及。而在观战正邪两派的斗争中，阿星逐渐领悟功夫的真谛。",
    "genre": null,
    "country": null    
})

const persons = ref([
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        role: 'director'
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        role: 'director'
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        role: 'director'
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        role: 'director'
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        role: 'director'
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        role: 'director'
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        role: 'director'
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        role: 'director'
    },
])

onMounted(() => {
    // 从路由中获取的字段
    const movieID = route.params['movieid']
    // ajax从服务端获取details和persons
    
})

// 分享功能
const shareOptions = {
    title: `Sleepy电影推荐`,
    text: `为你推荐一部评分为${movieDetail.value.rating}的电影 ${movieDetail.value.name}!`,
    url: route.fullPath
}
const shareTool = useShare(shareOptions)
const doShare = () => shareTool.share().catch(err => err)

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