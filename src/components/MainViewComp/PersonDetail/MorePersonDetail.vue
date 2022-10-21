<template>
    <el-collapse v-model="active" accordion @change="handleChange">
        <el-collapse-item title="最近作品" name="latest">
            <side-card v-for="item in lists.latest" :img="item.img" :name="item.name" :text="item.text"></side-card>
        </el-collapse-item>
        <el-collapse-item title="最受好评作品" name="top">
            <side-card v-for="item in lists.top" :img="item.img" :name="item.name" :text="item.text"></side-card>
        </el-collapse-item>    
        <el-collapse-item title="合作最多影人" name="partners">
            <side-card v-for="item in lists.partners" :img="item.img" :name="item.name" :text="item.text"></side-card>
        </el-collapse-item>
    </el-collapse>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const active = ref()

const lists = ref({
    latest:[{img: '', name: '', text: ''}],
    top:[{img: '', name: '', text: ''}],
    partners:[{img: '', name: '', text: ''}],
})

const handleChange = (activeName: string) => {
    if (activeName === "latest") {
        // 获取对应数据
    } else if (activeName === "top") {
        // 获取对应数据
    } else if (activeName === "partners") {
        // 获取对应数据
    }
}
</script>

<style scoped>

</style>