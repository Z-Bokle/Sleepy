<template>
    <el-scrollbar>
        <el-menu @open="handleOpen" @close="handleClose" :router="true">
            <component :is="isDark ? logo : logoDark"></component>
            <el-menu-item-group v-for="menuItemGroup in menuItemGroups" :title="menuItemGroup.title"
                class="el-menu-item-group">
                <el-menu-item v-for="menuItem in menuItemGroup.menuItems" :index="menuItem.index">
                    <el-icon>
                        <component :is="menuItem.icon"></component>
                    </el-icon>
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
import { useToggle, useDark } from '@vueuse/core';
import { h, type VNode, ref } from 'vue';
import { 
    Sunny, 
    Moon, 
    Grid, 
    Star,
    Collection,
    Clock,
} from '@element-plus/icons-vue';

const isDark = useDark();
const toggieDark = useToggle(isDark);

interface menuItem {
    // 菜单项目
    // 索引，不重复字符串，同时兼顾菜单路由
    index: string,
    // 显示文本
    text: string,
    // 菜单图标
    icon: VNode
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
        icon: h(Star)
    },
    {
        index: "moviedb",
        text: "电影数据库",
        icon: h(Grid)
    }]
},
{
    title: "电影数据库",
    menuItems: [{
        index: "like",
        text: "Like",
        icon: h(Collection)
    },
    {
        index: "recently-play",
        text: "Recently Play",
        icon: h(Clock)
    }]
}];

const logo:VNode = h('img',{
    src: './assets/img/Sleepy_Logo.png',
    draggable: false,
    style:` width:133px;
            height:60px;
            margin-left: 15px;
            margin-top: 5px;`
})

const logoDark:VNode = h('img',{
    src: './assets/img/Sleepy_Logo_Dark.png',
    draggable: false,
    style:` width:133px;
            height:60px;
            margin-left: 15px;
            margin-top: 5px;`
})

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

</script>

<style scoped>
.el-menu-item-text{
    margin-right: 23px;
}
</style>