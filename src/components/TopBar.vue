<script lang="ts" setup>
import { useToggle, useDark } from '@vueuse/core'
import { Sunny,Moon } from '@element-plus/icons-vue';
import Logo from './Logo';

const isDark = useDark();
const toggieDark = useToggle(isDark);

</script>

<template>
    <el-space>
        <logo :is-dark="isDark" class="logo"></logo>
        
        <el-space>
            <el-switch v-model="isDark" 
            :active-icon="Moon" active-color="#000000" 
            :inactive-icon="Sunny" inactive-color="#AAAAAA" 
            :inline-prompt="true"
            size="large"
            @change="toggieDark"/>
        </el-space>

        <el-space>


        </el-space>

    </el-space>
</template>

<style>


</style>