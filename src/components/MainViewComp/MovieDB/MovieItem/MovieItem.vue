<template>
	<el-skeleton style="width:250px; height:420px" :loading="loading" animated>
		<template #template>
            <movie-item-loading></movie-item-loading>
		</template>
		<!-- 加载完成(loading为false)后显示的内容 -->
		<template #default>
			<movie-item-loaded 
			  :img="movieDetails.img"
			  :name="movieDetails.name"
			  :desc="movieDetails.desc"
			  @click="router.push(`/moviedb/details/${movieDetails.id}`)"
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

// 接口调通后修改为正式收到的对象
const movieDetails = ref({
	img: '',
	name: '',
	desc: '',
	id:0
})

onBeforeMount(() => {
	// ajax获取电影信息
	setTimeout(() => {
		movieDetails.value = {
			id: 1291543,
			img:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2219011938.webp',
			name:'功夫',
			desc:'测试一下简介。首先，多读书多看报；其次，少吃零食多睡觉。这一句话应该就超出了吧！'
		}
		// ajax获取到信息后将loading设为false
		loading.value = false;
	}, 2000)
})

</script>
