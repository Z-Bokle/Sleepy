<template>
<el-card @click="jump">
    <el-row :gutter="5">
        <el-col :span="10">
            <el-image :src="img" referrerpolicy="no-referrer" />
        </el-col>
        <el-col :span="14">
            <el-row>
                <div class="name">{{ name }}</div>
            </el-row>
            <el-row>
                <div class="text">{{ text }}</div>
            </el-row>
        </el-col>
    </el-row>
</el-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    img: {type: String, required: true},
    name: {type: String, required: true},
    text: {type: String, required: true},
    id: {type: Number, required: true},
})

const router = useRouter()

const jump = () => {
    router.push(`/moviedb/details/${props.id}`)
}

</script>

<style scoped>
.name {
    font-size: 0.9em;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.text {
    font-size: 0.7em;
    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    margin-top: 10px;
}

</style>