<script setup lang="ts">
	import SideList from './components/SideList.vue';
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside>
					<side-list></side-list>
				</el-aside>
				<el-container>
					<el-main>Main</el-main>
					<el-footer>Footer</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<style>

</style>
