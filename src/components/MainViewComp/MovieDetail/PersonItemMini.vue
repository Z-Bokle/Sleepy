<template>
    <el-card class="card">
        <el-image :src="props.img" class="img" referrerpolicy="no-referrer" />
        <div class="name">{{ props.name }}</div>
        <div class="role">{{ roleMap.get(props.role) }}</div>
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
    role: {
        type: String,
        required: true
    }
})

const roleMap = new Map<String,String>([
    ['author', '作者'],
    ['director', '导演'],
    ['actor', '演员']
])

</script>

<style scoped>
.card {
    width: 110px;
    height: 180px;
}
.name {
    font-size: 1em;
    text-align: center;
}
.role {
    font-size: 0.8em;
    text-align: center;
}
</style>