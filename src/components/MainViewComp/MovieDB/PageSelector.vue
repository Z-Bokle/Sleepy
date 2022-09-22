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
    console.log("page is updated")
});
</script>

<style scoped>
    .pages{
        position: absolute;
        left: 40%;
        bottom: 4%;
    }
    </style>