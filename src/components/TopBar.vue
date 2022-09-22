<template>
    <el-page-header :icon="ArrowLeft" :title="'返回'" @back="clickBack">
        <template #breadcrumb>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="link in links" :to="{path: link.route}">
                    {{ link.part }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        
        <template #extra>
            <div class="user-data">
                <el-popover placement="bottom-end">
                    <template #reference>
                        <el-avatar></el-avatar>
                    </template>
                    <span>这里展示用户个人信息捏</span>
                </el-popover>
            </div>
        </template>

        <template #content>
            <div class="title">
                <span>这个是标题</span>
            </div>
        </template>
    </el-page-header>
</template>

<script lang="ts" setup>
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const links = ref([{
    part:'',
    route:''
}])
const clickBack = () => {
    // 回退一步
    router.back()
}

// 路由后置钩子，在路由改变后触发，用于修改面包屑的内容
// 同时用于在路由变化时修改SideList高亮
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
    //设置主页文本
    links.value[0].part = "主页"
})

</script>

<style scoped>
.user-data{
    display: flex;
    margin-right: 20px;
}
.title{
    display: flex;
}
.title > span{
    font-weight: bold;
}
</style>