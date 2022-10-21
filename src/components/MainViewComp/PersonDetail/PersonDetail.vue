<template>
    <div class="container">
        <el-row :gutter="30">
            <el-col :span="4">
                <div class="poster-container">
                    <el-image :src="personDetail.img" referrerpolicy="no-referrer" class="poster" draggable="false" />
                </div>
                <div class="like" v-if="store.state.account.login"><like-selector></like-selector></div>
                <div class="like" v-else><el-card>请登录后查看喜好</el-card></div>
            </el-col>
            <el-col :span="12">
                <div class="desc">
                    <el-descriptions direction="vertical">
                        <template #title>
                            <span class="title">{{ personDetail.name }}</span>
                            <el-button 
                                type="plain" 
                                :icon="Share"
                                circle 
                                :disabled="!shareTool.isSupported"
                                @click="doShare()"
                                class="share-button"
                                />
                        </template>
                        <el-descriptions-item label="性别" :span="1">
                            {{ personDetail.sex }}
                        </el-descriptions-item>
                        <el-descriptions-item label="生日" :span="1">
                            {{ personDetail.birthday }}
                        </el-descriptions-item>
                        <el-descriptions-item label="出生地" :span="1">
                            {{ personDetail.birthplace }}
                        </el-descriptions-item>    
                        <el-descriptions-item label="概述" :span="3">
                            <el-scrollbar :always="true">
                                <div class="summary-text">
                                    {{ personDetail.summary }}
                                </div>                                
                            </el-scrollbar>
                        </el-descriptions-item>     
                        <el-descriptions-item label="相似影人">
                            <el-scrollbar>
                                <div class="scrollbar-content">
                                    <person-item-mini
                                        v-for="person in persons"
                                        :name="person.name"
                                        :img="person.img"
                                        :rate="person.rate"
                                        class="scrollbar-item"
                                    >
                                    </person-item-mini>
                                </div>
                            </el-scrollbar>
                        </el-descriptions-item>                    
                    </el-descriptions>
                </div>
                
            </el-col>
            <el-col :span="8">
                <div class="more">
                    <more-person-detail></more-person-detail>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Share } from '@element-plus/icons-vue'
import { useShare } from '@vueuse/core';
import { useStore } from 'vuex';
import LikeSelector from './LikeSelector.vue';
import PersonItemMini from './PersonItemMini.vue';
import MorePersonDetail from './MorePersonDetail.vue';

const route = useRoute()
const store = useStore()


const personDetail = ref({
  "id": 1339808,
  "name": "王源 Roy Wang",
  "sex": "男",
  "birthday": "2000/11/8",
  "birthplace": "中国,重庆",
  "summary": "王源，2000年11月8日生于中国重庆，中国内地男歌手、演员、主持人，TFBOYS成员。2011年底成为TF家族练习生，2013年8月6日以组合形式出道。2015年，14岁的王源开始独立作词作曲，参演电影《爵迹》、电视剧《青云志》饰演少年张小凡。2016年，首支原创单曲《因为遇见你》播放量破3亿、微博转发量破4亿，获第9届城市至尊音乐榜年度听众最爱新人，2016亚洲新歌榜年度十大金曲。2017年，王源原创单曲《十七》，获央视全球中文音乐榜上榜年度最佳原创歌手与年度最佳中文歌曲。迄今为止，王源已有10首个人单曲。2017年，王源出任“联合国儿童基金会青年教育使者”，两度参加联合国经济与社会理事会青年论坛并英文演讲，是首位受邀联合国青年论坛的中国艺人，也是首位登上联合国世界舞台的中国少年偶像；同年，王源入选美国《时代》周刊全球最具影响青少年30位之一，也是唯一入选的中国00后；10月，出演第五代导演王小帅指导的文艺片电影《地久天长》；11月，成立“源公益专项基金”。2018年，王源领衔主演玄幻传奇古装大IP电视剧《大主宰》，饰演男主角牧尘，该剧将于2019年播出；3月，受Chopard萧邦邀请出席于巴塞尔国际钟表珠宝展举办的“可持续发展的奢侈品之路”新闻发布会和讨论会，随后成为Chopard萧邦全球最年轻品牌大使；5月，受官方赞助的双品牌邀请出席戛纳电影节，红毯着装入选“2018年戛纳电影节最佳红毯着装”；8月，王源作为主演之一正式加入《极限特工4》团队，电影将于2019年1月开拍。",
  "img": "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1535447147.41.webp"
});

// 分享功能
const shareOptions = {
    title: `Sleepy影人推荐`,
    text: `为你推荐一位影人，名叫${personDetail.value.name}`,
    url: route.fullPath
}

const persons = ref([
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        rate: 0.98
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        rate: 0.97
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        rate: 0.96
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        rate: 0.95
    },
    {
        name: '冯小刚',
        img: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45667.webp',
        rate: 0.94
    }
])

const shareTool = useShare(shareOptions)
const doShare = () => shareTool.share().catch(err => err)

onMounted(() => {
    //ajax获取相似影人
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
.more {
    height: 100%;
}
.share-button {
    margin-left: 20px;
    margin-bottom: 20px;
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
.like {
    height: 40vh;
    margin-top: 8vh;
}
.desc {
    height: 100%;
}
.summary-text {
    max-height: 70px;
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
</style>