<template>
    <el-collapse v-model="active" accordion>
        <el-collapse-item title="最近作品" name="1">

        </el-collapse-item>
        <el-collapse-item title="最受好评作品" name="2">

        </el-collapse-item>    
        <el-collapse-item title="合作最多影人" name="3">

        </el-collapse-item>
    </el-collapse>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const active = ref('1')

onMounted(() => {
    // ajax加载相关信息
})
</script>

<style scoped>

</style>