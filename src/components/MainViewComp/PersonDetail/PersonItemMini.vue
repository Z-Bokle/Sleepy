<template>
    <el-card class="card">
        <el-image :src="props.img" class="img" referrerpolicy="no-referrer" />
        <div class="name">{{ props.name }}</div>
        <div class="rate">相似度:{{ props.rate * 100 }}%</div>
    </el-card>
</template>

<script lang="ts" setup>

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
})


</script>

<style scoped>
.card {
    width: 110px;
    height: 170px;
}
.name {
    font-size: 1em;
    text-align: center;
}
.rate {
    font-size: 0.8em;
    text-align: center;
}
.img {
    margin-top: -5px;
}
</style>