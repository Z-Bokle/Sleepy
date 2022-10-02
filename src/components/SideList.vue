<template>
    
    <el-scrollbar>
        
        <el-menu :router="true" @click="handleClick">
            
            <el-menu-item-group v-for="menuItemGroup in menuItemGroups" :title="menuItemGroup.title"
                class="el-menu-item-group">
                <el-menu-item v-for="menuItem in menuItemGroup.menuItems" :index="menuItem.index">
                    <el-icon>
                        <component :is="menuItem.icon"></component>
                    </el-icon>
                    <span>{{menuItem.text}}</span>
                </el-menu-item>
            </el-menu-item-group>

        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { h, type VNode } from 'vue';
import { 
    Star,
    Picture,
    User,
    Film,
    ChatRound
} from '@element-plus/icons-vue';

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
        text: "猜你喜欢",
        icon: h(ChatRound)
    },
    {
        index: "collections",
        text: "收藏夹",
        icon: h(Star)
    },
    {
        index: "persona",
        text: "用户画像",
        icon: h(Picture)
    }]
},
{
    title: "数据检索",
    menuItems: [{
        index: "moviedb",
        text: "电影数据库",
        icon: h(Film)
    },
    {
        index: "persondb",
        text: "影人数据库",
        icon: h(User)
    }]
}];


const handleClick = (key: string, keyPath: string[]) => {
    
}

</script>

<style scoped>

</style>