<template>
    <el-scrollbar height="97vh">
        <logo :is-dark="isDark" class="logo"></logo>

        <el-menu default-active="suggest" @open="handleOpen" @close="handleClose" router="true">

            <el-menu-item-group v-for="menuItemGroup in menuItemGroups" :title="menuItemGroup.title"
                class="el-menu-item-group">
                <el-menu-item v-for="menuItem in menuItemGroup.menuItems" :index="menuItem.index">
                    <dynamic-icon :type="menuItem.icon"></dynamic-icon>
                    <span>{{menuItem.text}}</span>
                </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="设置" class="el-menu-item-group">
                <el-menu-item>
                <span class="el-menu-item-text">夜间模式</span>
                <el-switch v-model="isDark" :active-icon="Moon" active-color="#000000" :inactive-icon="Sunny"
                    inactive-color="#AAAAAA" :inline-prompt="true" size="large" @change="toggieDark" />                    
                </el-menu-item>
            </el-menu-item-group>


        </el-menu>

    </el-scrollbar>
</template>

<script lang="ts" setup>
import dynamicIcon from './SideListComp/ListIcon';
import logo from './SideListComp/Logo';
import { useToggle, useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue';
import Logo from './SideListComp/Logo';

const isDark = useDark();
const toggieDark = useToggle(isDark);

interface menuItem {
    // 菜单项目
    // 索引，不重复字符串，同时兼顾菜单路由
    index: string,
    // 显示文本
    text: string,
    // 菜单图标对应字符串
    icon: string
}

interface menuItemGroup {
    // 菜单组
    // 组标题
    title: string,
    // 组内菜单项
    menuItems: menuItem[]
}

const menuItemGroups: menuItemGroup[] = [{
    title: "个性化",
    menuItems: [{
        index: "suggest",
        text: "推荐",
        icon: "star"
    },
    {
        index: "music-hall",
        text: "Music Hall",
        icon: "mic"
    }]
},
{
    title: "电影数据库",
    menuItems: [{
        index: "like",
        text: "Like",
        icon: "collection"
    },
    {
        index: "recently-play",
        text: "Recently Play",
        icon: "clock"
    }]
}];

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


</script>

<style scoped>
.logo {
    margin-left: 26px;
}
.el-menu-item-text{
    margin-right: 30px;
}
</style>