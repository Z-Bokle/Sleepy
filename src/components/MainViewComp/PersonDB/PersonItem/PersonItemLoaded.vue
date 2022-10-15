<!-- MovieItem 加载后的展示 -->
<template>
    <el-card class="card">
        <el-row :gutter="30">
            <el-col :span="10">
                <img
                    :src="img"
                    referrerpolicy="no-referrer"
                    width="150"
                    height="200"
                />
                <!-- referrer policy解决防盗链403问题 -->            
            </el-col>
            <el-col :span="14">
                <el-row :gutter="10">
                    <el-col :span="24"><span class="name">{{ name }}</span></el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24"><div class="summary">{{ summary }}</div></el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts" setup>
const props = defineProps({
    // 图片外链
    img: String,
    // 姓名
    name: { type: String, required: true },
    // 描述
    summary: { type: String, required: true }
});

</script>

<style scoped>
.card {
    width: 420px;
    height: 240px;
}
.summary {
    overflow: hidden;
    -webkit-line-clamp: 6;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-top: 30px;
}
@font-face {
    font-family: 'MiSans';
    src: url('../../../../assets/fonts/MiSans-Normal.ttf');
}
@font-face {
    font-family: 'MiSans-SemiBold';
    src: url('../../../../assets/fonts/MiSans-SemiBold.ttf');
}
.name {
    font-size: 1.5em;
    font-family: MiSans-SemiBold;

    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

</style>
