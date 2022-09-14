<script setup lang="ts">
import SideList from './components/SideList.vue';
import MainView from './components/MainView.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
		<side-list></side-list>
	  </el-aside>
      <el-container>
        <el-header style="background-color:brown">Header</el-header>
        <el-main>
			<main-view></main-view>
		</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>

</style>
