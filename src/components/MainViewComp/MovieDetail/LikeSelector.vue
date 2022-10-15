<template>
    <el-card shadow="hover">
        <div class="text-content">
            <div class="selector-before" v-if="likeCode === 0">
                <div class="text">您是否喜欢该电影?</div>
                <div class="icon-between">
                    <el-tooltip content="我喜欢">
                        <component 
                            :is="likeHover ? likeIcons.likeFilled : likeIcons.like"
                            @mouseenter="likeHover = true" 
                            @mouseleave="likeHover = false" 
                            @click="setLikeCode(1)"
                        ></component>
                    </el-tooltip>
                    <el-tooltip content="我不喜欢">
                        <component 
                            :is="dislikeHover ? likeIcons.dislikeFilled : likeIcons.dislike" 
                            @mouseenter="dislikeHover = true" 
                            @mouseleave="dislikeHover = false" 
                            @click="setLikeCode(-1)"
                        ></component>
                    </el-tooltip>
                </div>
            </div>
            <div class="selector-after" v-if="likeCode !== 0">
                <div v-if="likeCode === 1" class="text">您已经将该电影标记为喜欢</div>
                <div v-else class="text">您已经将该电影标记为不喜欢</div>
                <div class="icon-between">
                    <component :is="likeCode === 1 ? likeIcons.likeFilled : likeIcons.dislikeFilled"></component>
                    <el-tooltip content="重置">
                        <undo theme="outline" size="24" fill="#333" class="reset" />
                    </el-tooltip>
                </div>

            </div>
        </div>
        
    </el-card>
</template>

<script lang="ts" setup>
import { Like, DislikeTwo, Undo } from "@icon-park/vue-next";
import axios from "axios";
import { ref, h, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const movieID = route.params['movieid']

const likeCode = ref<Number>(0)

const likeIcons = computed(() => {
    return {
        like: h(Like, {theme:'outline', size: 24, fill: '#333'}),
        dislike: h(DislikeTwo, {theme:'outline', size: 24, fill: '#333'}),
        likeFilled: h(Like, {theme: 'filled', size: 24, fill: '#d31b1b'}),
        dislikeFilled: h(DislikeTwo, {theme:'filled', size: 24, fill: '#8b8b8b'}),
    }
})

const likeHover = ref(false)
const dislikeHover = ref(false)

const setLikeCode = (code: Number) => {
    axios({
        method: 'post',
        url: `/movie/${movieID}/like`,
        data: {like: code},
        headers: {
        'Content-Type': 'application/json'
        },
    })
    .then((res) => {
        if(res.data.status === 0) likeCode.value = code;
    })
}

onMounted(() => {
    axios({
        method: 'get',
        url: `/movie/${movieID}/like`
    })
    .then((res) => {
        likeCode.value = res.data.like
    })
})

</script>

<style scoped>
@font-face {
    font-family: 'MiSans';
    src: url('../../../assets/fonts/MiSans-Normal.ttf');
}

.text-content {
    font-size: 0.85em;
    font-family: 'MiSans';
}
.text {
    font-size: 1.1em;
}
.icon-between {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.reset:hover {
    animation: rotate .8s;
}
@keyframes rotate {
    0% {
        transform: rotateX(0deg);
    }
    100% {
        transform: rotateZ(-360deg);
    }
}
</style>