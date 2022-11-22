<template>
    <el-dialog v-model="show" title="影评" width="80%" destroy-on-close>
        <div class="title" v-if="loading">加载中...</div>
        <div v-else>
            <el-row :gutter="10" v-if="list.negative.length !== 0 || list.positive.length !== 0">
                <el-col :span="12">
                    <div class="title">好评精选</div>
                    <div class="comments">
                        <comment-card v-for="comment in list.positive" 
                            :readability="comment.readability"
                            :valence="comment.valence"
                            :text="comment.text"
                            ></comment-card>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="title">差评精选</div>
                    <div class="comments">
                        <comment-card v-for="comment in list.negative" 
                            :readability="comment.readability"
                            :valence="comment.valence"
                            :text="comment.text"
                            ></comment-card>
                    </div>
                </el-col>
            </el-row>
            <div v-else class="title">没有影评</div>            
        </div>

    </el-dialog>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import CommentCard from './CommentCard.vue';

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

const route = useRoute()
const movieID = ref(route.params['movieid'])
const loading = ref(true)

interface comment {
    text: string,
    valence: number,
    readability: number
}

const list = ref<{
    positive: comment[],
    negative: comment[]
}>({
    positive:[],
    negative:[]
})

const show = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    }
})

onUpdated(() => {
    if(!show.value) return // 未打开就不加载
    if(!loading.value) return // 未处于加载状态就不加载
    axios({
        method: 'get',
        url: `/movie/${movieID.value}/comments`,
    })
    .then((res) => {
        list.value.negative = []
        list.value.positive = []
        if(res.data.status === 0) {
            if(res.data.data != null)
                list.value = res.data.data
            else
                ElMessage("未获取到评论")
        } else {
            ElMessage("评论获取失败")
        }
    })
    .finally(() => {
        loading.value = false
    })
})

onBeforeRouteUpdate((to, from) => {
    if(to.name !== 'MovieDetail') return
    movieID.value = to.params['movieid']
    loading.value = true
})


</script>

<style scoped>
.title {
    font-size: 1.2em;
    font-weight: 600;
}
.comments {
    margin-top: 20px;
}

</style>