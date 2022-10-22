<template>
    <div style="display:flex;">
        <div class="logo">
            <component :is="logo"></component>
        </div>

        <el-page-header :icon="ArrowLeft" :title="'返回'" @back="clickBack" class="header">
            <template #breadcrumb>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item v-for="link in links" :to="{path: link.route}">
                        {{ link.part }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            
            <template #extra>
                <div class="extra">
                    <movie-filter></movie-filter>
                    <el-icon :size="25" class="icon" @click="drawerVisible = true"><setting-one /></el-icon>  
                    <user-info></user-info>
                </div>
            </template>

            <template #content>
                <div class="title">
                    <span>{{ route.meta.title }}</span>
                </div>
            </template>
        </el-page-header>
    </div>
        <el-drawer v-model="drawerVisible">
            <template #header>
                <h1>设置</h1>
            </template>

            <span class="setting-text">夜间模式</span>
            <el-switch v-model="isDark" :active-icon="Moon" active-color="#000000" :inactive-icon="Sunny"
                inactive-color="#AAAAAA" :inline-prompt="true" size="large" @change="toggleDark" />
        </el-drawer>

</template>

<script lang="ts" setup>
import { ArrowLeft, ArrowRight, Sunny, Moon } from '@element-plus/icons-vue';
import { computed, h, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDark, useToggle, useFavicon } from '@vueuse/core';
import UserInfo from './TopBarComp/UserInfo.vue';
import MovieFilter from './TopBarComp/MovieFilter.vue';
import { SettingOne } from '@icon-park/vue-next';

const router = useRouter()
const route = useRoute()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const favicon = computed(() => isDark.value ? './assets/img/Sleepy_Moon.png' : './assets/img/Sleepy_Moon_Dark.png')
useFavicon(favicon)

const drawerVisible = ref(false);

const links = ref([{
    part:'',
    route:''
}])

const clickBack = () => {
    // 回退一步
    router.back()
}

// 路由后置钩子，在路由改变后触发，用于修改面包屑的内容
// TODO 同时用于修改menu的高亮
router.afterEach((to, from) => {
    console.log(to.fullPath)
    let parts = to.fullPath.split('/')
    links.value = []
    for(let i = 0; i < parts.length; i++) {
        links.value.push({
            part:parts[i],
            route:'/' + parts.slice(1,i + 1).join('/')
        })
    }
    //设置主页的面包屑文本
    links.value[0].part = "主页"

})

const logo = computed(() => {
    return h('img',{
    src: isDark.value ? './assets/img/Sleepy_Logo.png' : './assets/img/Sleepy_Logo_Dark.png',
    draggable: false,
    style:  'width:133px;height:60px;'})
})
</script>

<style scoped>
.title{
    display: flex;
}
.title > span{
    font-weight: bold;
}
.extra{
    display: flex;
}
.icon{
    margin-right: 16px;
}
.setting-text{
    margin-right: 30px;
}
.header{
    width: 90vw;
}
.logo{
    margin-right: 40px;
}
</style>