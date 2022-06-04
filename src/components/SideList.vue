<template>
    <el-scrollbar>
        <el-menu default-active="suggest" @open="handleOpen" @close="handleClose" router="true">
            <el-menu-item-group v-for="item in listItems" :title="item.title" class="el-menu-item-group">
                <el-menu-item v-for="subItem in item.subItems" :index="subItem.index">
                    <dynamic-icon :type="subItem.icon"></dynamic-icon>
                    <span>{{subItem.text}}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-menu>

    </el-scrollbar>
</template>

<script lang="ts" setup>
import dynamicIcon from './ListIcon';


let listItems = [{
    title:"Online Music",
    subItems:[{
        index:"suggest",
        text:"Suggest",
        router:"",
        icon:"star"
    },
    {
        index:"music-hall",
        text:"Music Hall",
        router:"",
        icon:"mic"
    }]
},
{
    title:"My Misic",
    subItems:[{
        index:"like",
        text:"Like",
        router:"",
        icon:"collection"
    },
    {
        index:"recently-play",
        text:"Recently Play",
        router:"",
        icon:"clock"
    }]
},
{
    title:"My Music List",
    subItems:[]
}];


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-item-group{
    margin-bottom: 26px;
}
</style>