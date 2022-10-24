<template>
    <div class="items">
        <person-item v-for="person in persons" :person-detail="person" class="item"></person-item>        
    </div>
    <page-selector v-model="currentPage" :page-count="pageCount"></page-selector>
</template>

<script lang="ts" setup>
import PersonItem from './PersonItem/PersonItem.vue';
import PageSelector from '../PageSelector.vue';
import { ref, watchEffect } from "vue";
import axios from 'axios';
import { ElMessage } from 'element-plus';

const pageCount = ref(30);

const currentPage = ref(1);

const persons = ref<{
    id: number;
    img: string;
    name: string;
    summary: string;
}[]>()

watchEffect(() => {
    // 自动监听页码变化刷新列表
    axios({
        method: 'post',
        url: '/person/list',
        params: {
            page: currentPage.value,
            size: 12
        }
    })
    .then((res) => {
        if(res.data.status === 0) {
            pageCount.value = res.data.data.total
            persons.value = res.data.data.list            
        } else {
            ElMessage(res.data.msg)
        }
    })
})

</script>
<style scoped>
.items {
    max-height: 68vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>