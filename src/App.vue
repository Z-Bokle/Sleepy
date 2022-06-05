<script setup lang="ts">
	import SideList from './components/SideList.vue';
	import TopBar from './components/TopBar.vue';
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<top-bar></top-bar>
			</el-header>
			<el-container>
				<el-aside width="200px">
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
