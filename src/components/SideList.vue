<template>
    <el-scrollbar>
        <el-menu default-active="suggest" @open="handleOpen" @close="handleClose" router="true">
        <el-space direction="vertical" size="large" :fill="true">
            <el-menu-item-group v-for="menuItemGroup in menuItemGroups" :title="menuItemGroup.title" class="el-menu-item-group">
                <el-menu-item v-for="menuItem in menuItemGroup.menuItems" :index="menuItem.index">
                    <dynamic-icon :type="menuItem.icon"></dynamic-icon>
                    <span>{{menuItem.text}}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-space>    
        </el-menu>

    </el-scrollbar>
</template>

<script lang="ts" setup>
import dynamicIcon from './ListIcon';

interface menuItem{
    // 菜单项目
    // 索引，不重复字符串，同时兼顾菜单路由
    index:string,
    // 显示文本
    text:string,
    // 菜单图标对应字符串
    icon:string
}

interface menuItemGroup{
    // 菜单组
    // 组标题
    title:string,
    // 组内菜单项
    menuItems:menuItem[]
}

const menuItemGroups:menuItemGroup[] = [{
    title:"Online Music",
    menuItems:[{
        index:"suggest",
        text:"推荐",
        icon:"star"
    },
    {
        index:"music-hall",
        text:"Music Hall",
        icon:"mic"
    }]
},
{
    title:"My Misic",
    menuItems:[{
        index:"like",
        text:"Like",
        icon:"collection"
    },
    {
        index:"recently-play",
        text:"Recently Play",
        icon:"clock"
    }]
},
{
    title:"My Music List",
    menuItems:[]
}];


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
