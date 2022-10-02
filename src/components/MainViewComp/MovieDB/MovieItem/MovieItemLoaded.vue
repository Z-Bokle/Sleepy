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
                    <el-col :span="12"><span class="title">{{ name }}</span></el-col>
                    <el-col :span="8" :offset="4"><span class="year">{{ year }}</span></el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24"><div class="desc">{{ desc }}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="tags">
                            <el-tag v-for="tag in tags.length > 6 ? tags.slice(0,6) : tags" size="small" class="tag">{{ tag }}</el-tag>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts" setup>
const props = defineProps({
    // 图片外链
    img: String,
    // 电影名
    name: { type: String, required: true },
    // 描述
    desc: { type: String, required: true },
    year: Number,
    tags: { type: Array<String>, required: true }
});

</script>

<style scoped>
.card {
    width: 420px;
    height: 240px;
}
.desc {
    overflow: hidden;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-top: 20px;
}
@font-face {
    font-family: 'MiSans';
    src: url('../../../../assets/fonts/MiSans-Normal.ttf');
}
@font-face {
    font-family: 'MiSans-SemiBold';
    src: url('../../../../assets/fonts/MiSans-SemiBold.ttf');
}
.title {
    font-size: 1.5em;
    font-family: MiSans-SemiBold;
}
.year {
    font-size: 1.5em;
    font-size: MiSans;
}
.tag {
    margin-top: 5px;
    margin-right: 5px;
}
</style>
