<template>
    <el-pagination 
    background 
    layout="prev, pager, next" 
    :page-count="30" 
    class="pages" 
    v-model:current-page="currentPage" 
    />
</template>

<script lang="ts" setup>
import { onUpdated, ref } from "vue";
const currentPage = ref(1);
onUpdated(() => {
    // 发送ajax请求，获取页码对应的电影信息
    console.log(`页码更新了，现在应该用ajax请求第${currentPage.value}页`)
});
</script>

<style scoped>
    .pages{
        position: absolute;
        left: 36vw;
        bottom: 4%;
    }
    </style>