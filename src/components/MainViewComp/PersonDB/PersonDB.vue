<template>
    <person-item></person-item>
    <page-selector @vnode-updated="updatePage()" v-model="currentPage"></page-selector>

</template>

<script lang="ts" setup>
import PersonItem from './PersonItem/PersonItem.vue';
import PageSelector from '../PageSelector.vue';
import { ref } from "vue";

const currentPage = ref(1);

const updatePage = () => {
    // 发送ajax请求，获取页码对应的电影信息
    console.log(`页码更新了，现在应该用ajax请求影人的第${currentPage.value}页`)
}

</script>
