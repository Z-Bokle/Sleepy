<template>
	<el-skeleton :loading="loading" :count="1" animated>
		<template #template>
            <movie-item-loading></movie-item-loading>
		</template>
		<!-- 加载完成(loading为false)后显示的内容 -->
		<template #default>
			<!-- 这里接口完成后采用v-for整体显示列表 -->
			<movie-item-loaded 
			  :img="movieDetail.img"
			  :name="movieDetail.name"
			  :desc="movieDetail.desc"
			  :year="movieDetail.year"
			  :tags="movieDetail.tags"
			  @click="router.push(`/moviedb/details/${movieDetail.id}`)"
			>
			</movie-item-loaded>
		</template>
	</el-skeleton>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import MovieItemLoaded from './MovieItemLoaded.vue';
import MovieItemLoading from "./MovieItemLoading.vue";

const router = useRouter();
const loading = ref(true);

// Vue3暂不支持使用接口定义props和emits的类型，因此这里不指定

const props = defineProps(['movieDetail'])


onBeforeMount(() => {
	setTimeout(() => {
		loading.value = false
	}, 300)
})

</script>
