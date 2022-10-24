<template>
    <el-pagination 
    background 
    layout="prev, pager, next, jumper" 
    :page-count="pageCount" 
    class="pages" 
    v-model:current-page="currentPage" 
    />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

// 使用计算属性、自定义事件和参数定义一个v-model参数

const props = defineProps({
    modelValue: {type: Number, required: true},
    pageCount: {type: Number, required: true}
})

const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const currentPage = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value)
    }
})

</script>

<style scoped>
.pages{
    position: absolute;
    left: 36vw;
    bottom: 3%;
}
</style>