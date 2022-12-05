<template>
    <div class="header">
        <span v-if="store.state.account.login">根据分析，您的个人关键词如下:</span>
        <span v-else>您暂未登录，无法查看用户画像!</span>
    </div>
    <div class="main" v-if="store.state.account.login">
        <el-row>
            <el-col :span="16"><div class="wordcloud" id="wordcloud"></div></el-col>
            <el-col :span="8">
                <div v-if="(currentTag.length > 0)">
                    <div class="title">{{ `标签名:${currentTag}` }}</div>
                    <div class="tip">该标签代表作品:</div>
                    <div class="movie-detail">
                        <div class="movie-title">{{ `${currentMovie.name}(${currentMovie.year})` }}</div>
                        <el-image :src="currentMovie.img" class="img" referrerpolicy="no-referrer" />
                    </div>
                </div>
            </el-col>
        </el-row>
    
    
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const store = useStore()

const movieid = ref()

const currentTag = ref('')

const currentMovie = ref({
    img: '',
    name: '',
    year: '',
})

const router = useRouter()

const keywords = ref<{
    name: string;
    value: number;
    mid: number;
}[]>([])

const option = computed(() => {
    return {
        series: [{
            type: 'wordCloud',
            //maskImage: maskImage,
            sizeRange: [15, 80],
            rotationRange: [-30, 30],
            rotationStep: 5,
            gridSize: 12,
            shape: 'pentagon',
            width: '100%',
            height: '100%',
            textStyle: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                },
                normal: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'normal'
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: keywords.value
        }]
    }
})

const initWordCloud = () => {
    let wordCloudDiv = document.getElementById('wordcloud')
    if (!wordCloudDiv) return;
    let myChart = echarts.init(wordCloudDiv);

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option.value);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    myChart.on('click', (params) => {
        // 点击标签
        if(movieid.value) router.push(`/moviedb/details/${movieid.value}`)
    })
    myChart.on('mouseover', (params) => {
        // 鼠标移动到标签上
        currentTag.value = params.name
        movieid.value = keywords.value.find(keyword => keyword.name === params.name)?.mid
        if(!movieid.value) return;
        axios({
            method: 'get',
            url: `/movie/${movieid.value}/details`
        })
        .then((res) => {
            currentMovie.value = res.data.data
        })
    })
}

onMounted(() => {
    axios({
        method: 'get',
        url: '/suggest/wordcloud'
    })
    .then((res) => {
        if(res.data.status !== 0) {
            ElMessage(res.data.msg);
        } else {
            keywords.value = res.data.data;
        }
    })
    .then(() => {
        initWordCloud();
    })
})
</script>

<style scoped>
@font-face {
    font-family: 'MiSans';
    src: url('../../../assets/fonts/MiSans-Normal.ttf');
}
@font-face {
    font-family: 'MiSans-SemiBold';
    src: url('../../../assets/fonts/MiSans-SemiBold.ttf');
}
.header {
    font-size: xx-large;
    font-family: MiSans-SemiBold;
}

.wordcloud {
    width: 800px;
    height: 600px;
}
.title {
    font-size: larger;
    font-weight: 600;
}
.movie-title {
    font-size: 1.5em;
    font-weight: bolder;
    font-family: MiSans;
}
.tip {
    font-size: 2em;
    color: rgb(6, 55, 78);
}
</style>