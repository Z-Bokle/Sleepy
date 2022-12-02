<template>
    <el-card class="card" @click="jump(movie.id)">
        <el-row :gutter="10">
            <el-col :span="9">
                <el-image :src="movie.img" referrerpolicy="no-referrer" class="img" />
            </el-col>
            <el-col :span="15">
                <el-row>
                    <div class="header">
                        <div class="title text-cut">{{ `${movie.name}(${movie.year})` }}</div>
                    </div>
                </el-row>
                <el-row>
                    <div class="rate card-block">
                        <el-rate v-model="viewRating" size="large" disabled :border="true" :colors="colors" />
                        <span class="rate-text">{{ movie.rating }}分</span>
                    </div>
                </el-row>
                <el-row>
                    <div class="tags card-block">
                        <el-tag v-for="tag in movie.tags" class="tag">{{ tag }}</el-tag>
                    </div>
                </el-row>
                <!-- <el-row>
                    <div class="like card-block">是否喜欢?</div>
                </el-row> -->
            </el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Movie {
    id: number,
    name: string,
    img: string,
    year: number,
    rating: number,
    tags: string[],
    desc: string,
    genre: { id: number, name: string }[],
    country: { id: number, name: string }[]
}

const props = defineProps<{ movie: Movie }>()

const router = useRouter()

const jump = (id: number) => {
    router.push(`/moviedb/details/${id}`)
}

// rate组件使用的颜色
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])

//用于rate组件展示的分数，并非实际分数
const viewRating = computed(() => { return props.movie.rating / 2 })
</script>

<style scoped>
@font-face {
    font-family: 'MiSans-SemiBold';
    src: url('../../../assets/fonts/MiSans-SemiBold.ttf');
}

.card {
    width: 440px;
    height: 240px;
    margin: 20px 30px 20px 30px;
    flex-shrink: 0;
    margin-top: 5px;
    margin-bottom: 5px;
}

.text-cut {
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.title {
    font-size: 1.3em;
    font-family: MiSans-SemiBold;
}

.header {
    display: flex;
    justify-content: space-between;
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
.card-block {
    margin-top: 10px;
    margin-left: 10px;
}
</style>