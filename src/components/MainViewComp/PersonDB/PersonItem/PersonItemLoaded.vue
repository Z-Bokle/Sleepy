<!-- MovieItem 加载后的展示 -->
<template>
    <el-card class="card">
        <el-row>
            <el-col :span="24">
                <img
                    :src="img"
                    referrerpolicy="no-referrer"
                    width="150"
                    height="200"
                />
                <!-- referrer policy解决防盗链403问题 -->            
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-col :span="24"><span class="name">{{ name }}</span></el-col>
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
    width: 190px;
    height: 270px;
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
    font-size: 1em;
    font-family: MiSans-SemiBold;

    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

</style>
