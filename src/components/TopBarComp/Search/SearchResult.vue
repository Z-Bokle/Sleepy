<template>
    <el-popover trigger="hover" placement="left">
        <template #reference>
            <div class="row" @click="jump(id)">
                <span class="text"><slot name="text"></slot></span>
                <span class="extra"><slot name="extra"></slot></span>
            </div>            
        </template>
        <el-image :src="img" referrerpolicy="no-referrer" />
    </el-popover>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()

const props = defineProps({
    img: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

const jump = (id: number) => {
    router.push(`${route.fullPath}/details/${id}`)
}

</script>

<style scoped>
.row {
    width: 100%;
    height: 6vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.text {
    font-weight: bold;
    font-size: 1.4em;
    margin-left: 5px;
}
.extra {
    font-size: 1.2em;
    margin-right: 5px;
}
.row:hover {
    background-color: var(--el-color-primary-light-5);
}
</style>