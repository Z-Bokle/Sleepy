<script setup lang="ts">
import SideList from './components/SideList.vue';
import MainView from './components/MainView.vue';
import TopBar from './components/TopBar.vue';
</script>

<template>
  <div class="common-layout">
    <el-container class="el-container">
      <el-header class="el-header">
        <top-bar></top-bar>
      </el-header>
      <el-container class="el-container">
        <el-aside width="180px">
          <side-list></side-list>
        </el-aside>
        <el-main>
          <main-view></main-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style>
body {
  margin: 0;
}

.el-header {
  margin-top: 20px;
}
.common-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
