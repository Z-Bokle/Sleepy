<template>
    <el-card style="width: 250px;height: 420px;">
    <img
        :src="img"
        referrerpolicy="no-referrer"
        width="210"
        height="280"
    />
    <!-- referrer policy解决防盗链403问题 -->
    <h1>{{ name }}</h1>
    <div style="
    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;"
    >{{ desc }}</div>
</el-card>
</template>

<script lang="ts" setup>
defineProps({
    // 图片外链
    img: String,
    // 电影名
    name: { type:String, required:true },
    // 描述
    desc: { type:String, required:true }
});

</script>

<style scoped>
h1{
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 1.4em;
}

</style>
<!-- MovieItem 加载后的展示 -->