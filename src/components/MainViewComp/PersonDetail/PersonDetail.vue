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
                                :disabled="!isSupported"
                                @click="share(shareOptions)"
                                class="share-button"
                                />
                        </template>
                        <el-descriptions-item :span="1">
                            <template #label><span class="label">性别</span></template>
                            {{ personDetail.sex }}
                        </el-descriptions-item>
                        <el-descriptions-item :span="1">
                            <template #label><span class="label">生日</span></template>
                            {{ personDetail.birthday }}
                        </el-descriptions-item>
                        <el-descriptions-item :span="1">
                            <template #label><span class="label">出生地</span></template>
                            {{ personDetail.birthplace }}
                        </el-descriptions-item>    
                        <el-descriptions-item :span="3">
                            <template #label><span class="label">概述</span></template>
                            <el-scrollbar :always="true">
                                <div class="summary-text">
                                    {{ personDetail.summary }}
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
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';
import { Share } from '@element-plus/icons-vue'
import { useShare } from '@vueuse/core';
import { useStore } from 'vuex';
import LikeSelector from './LikeSelector.vue';
import PersonItemMini from './PersonItemMini.vue';
import MorePersonDetail from './MorePersonDetail.vue';
import axios from 'axios';

const route = useRoute()
const store = useStore()

const personDetail = ref({
    name: '',
    img: '',
    sex: '',
    birthday: '',
    birthplace: '',
    summary: ''
});

// 分享功能
const shareOptions = {
    title: `Sleepy影人推荐`,
    text: `为你推荐一位影人，名叫${personDetail.value.name}`,
    url: route.fullPath
}
const { isSupported, share } = useShare()

onMounted(() => {
    const personID = route.params['personid']

    axios({
        method: 'get',
        url: `/person/${personID}/details`,
    })
    .then((res) => {
        personDetail.value = res.data.data
    })

})

onBeforeRouteUpdate((to, from) => {
    if(to.name !== 'PersonDetail') return

    axios({
        method: 'get',
        url: `/person/${to.params['personid']}/details`,
    })
    .then((res) => {
        personDetail.value = res.data.data
    })

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
    height: 25vh;
    margin-top: 8vh;
}
.desc {
    height: 100%;
}
.summary-text {
    max-height: 140px;
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
.label {
    font-size: 1.2em;
    font-weight: 600;
}
</style>