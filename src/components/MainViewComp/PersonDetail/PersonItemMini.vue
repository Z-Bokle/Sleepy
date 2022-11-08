<template>
    <el-card @click="jump" class="card">
        <el-image :src="props.img" class="img" referrerpolicy="no-referrer" />
        <div class="name">{{ props.name }}</div>
        <div class="rate">相似度:{{ props.rate * 100 }}%</div>
    </el-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

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
    },
    id: {
        type: Number,
        required: true
    }
})

const router = useRouter()

const jump = () => {
    router.push(`/persondb/details/${props.id}`)
}

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