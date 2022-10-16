<template>
	<el-skeleton :loading="loading" :count="1" animated>
		<template #template>
            <person-item-loading></person-item-loading>
		</template>
		<template #default>
			<person-item-loaded 
                :name="personDetail.name"
                :img="personDetail.img"
                :summary="personDetail.summary"
                @click="router.push(`/persondb/details/${personDetail.id}`)"
			>
			</person-item-loaded>
		</template>
	</el-skeleton>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import PersonItemLoaded from './PersonItemLoaded.vue';
import PersonItemLoading from './PersonItemLoading.vue';

const router = useRouter();
const loading = ref(true);

const props = defineProps(['personDetail'])

onBeforeMount(() => {
	setTimeout(() => {
		loading.value = false;
	}, 200)
})

</script>
