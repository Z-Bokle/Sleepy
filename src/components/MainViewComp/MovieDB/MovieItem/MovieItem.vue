<template>
	<el-skeleton style="width:250px; height:420px" :loading="loading" :count="1" animated>
		<template #template>
            <movie-item-loading></movie-item-loading>
		</template>
		<!-- 加载完成(loading为false)后显示的内容 -->
		<template #default>
			<!-- 这里接口完成后采用v-for -->
			<movie-item-loaded 
			  :img="movieDetails.img"
			  :name="movieDetails.name"
			  :desc="movieDetails.desc"
			  :year="movieDetails.year"
			  :tags="movieDetails.tags"
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
	year: 0,
	id: 0,
	tags: [""]
})

onBeforeMount(() => {
	// ajax获取电影信息
	setTimeout(() => {
		movieDetails.value = {
			id: 1291543,
			img:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2219011938.webp',
			name:'功夫',
			year: 2004,
			tags: ["周星驰", "喜剧", "香港", "功夫", "动作", "香港电影", "搞笑", "经典"],
			desc:'1940年代的上海，自小受尽欺辱的街头混混阿星（周星驰）为了能出人头地，可谓窥见机会的缝隙就往里钻，今次他盯上行动日益猖獗的黑道势力“斧头帮”，想借之大名成就大业。阿星假冒“斧头帮”成员试图在一个叫“猪笼城寨”的地方对居民敲诈，不想引来真的“斧头帮”与“猪笼城寨”居民的恩怨。“猪笼城寨”原是藏龙卧虎之处，居民中有许多身怀绝技者（元华、梁小龙等），他们隐藏于此本是为远离江湖恩怨，不想麻烦自动上身，躲都躲不及。而在观战正邪两派的斗争中，阿星逐渐领悟功夫的真谛。'
		}
		// ajax获取到信息后将loading设为false
		loading.value = false;
	}, 2000)
})

</script>
