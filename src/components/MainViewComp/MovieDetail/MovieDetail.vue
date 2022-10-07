<template>
    <div class="container">
        <el-row gutter="30">
            <el-col :span="4">
                <div class="poster">海报</div>
                <div class="like">喜欢</div>
            </el-col>
            <el-col :span="15">
                <div class="title">标题</div>
                <div class="desc">描述</div>
            </el-col>
            <el-col :span="5">
                <div class="similar">相似</div>
            </el-col>
        </el-row>
    </div>

</template>

<script lang="ts" setup>
import { onMounted } from 'vue';



onMounted(() => {
    // ajax从服务端获取details
    
})
</script>

<style scoped>
.container {
    height: 80vh;
    width: 100%;
}
.poster {
    height: 33vh;
    background-color: gray;
}
.like {
    height: 43vh;
    background-color: brown;
    margin-top: 5vh;
}
.title {
    height: 10vh;
    background-color: yellow;
}
.desc {
    height: 66vh;
    margin-top: 5vh;
    background-color: lightblue;
}
.similar {
    height: 100%;
    background-color: lightgreen;
}
</style>