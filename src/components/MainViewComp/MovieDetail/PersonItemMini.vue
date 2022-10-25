<template>
    <el-card class="card" @click="jump()">
        <el-image :src="props.img" class="img" referrerpolicy="no-referrer" />
        <div class="name">{{ props.name }}</div>
        <div class="role">{{ roleMap.get(props.role) }}</div>
    </el-card>
</template>

<script lang="ts" setup>import { useRouter } from 'vue-router';


const props = defineProps({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

const roleMap = new Map<String,String>([
    ['author', '作者'],
    ['director', '导演'],
    ['actor', '演员']
])

const router = useRouter()

const jump = () => {
    router.push(`/persondb/details/${props.id}`)
}

</script>

<style scoped>
.card {
    width: 110px;
    height: 190px;
}
.name {
    font-size: 1em;
    text-align: center;
        
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.role {
    font-size: 0.8em;
    text-align: center;
}
.img {
    margin-top: -5px;
}
</style>