<template>
    <el-page-header :icon="ArrowLeft" :title="'返回'" @back="clickBack">
        <template #breadcrumb>
            <el-breadcrumb separator=">">
                
            </el-breadcrumb>
        </template>
    </el-page-header>
</template>

<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter,useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const clickBack = () => {
    // 回退一步
    router.back()
}
</script>

<style scoped>

</style>