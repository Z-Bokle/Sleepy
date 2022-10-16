<!-- MovieItem加载时的展示 -->
<template>
  <el-card class="card">
        <el-row>
            <el-col :span="24">
				<el-skeleton-item variant="image" style="width: 150px; height: 200px" />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="18">
				<el-skeleton-item variant="h3" style="margin-top: 12px;" />
            </el-col>
        </el-row>        
    </el-card>
</template>
<style scoped>
.card {
    width: 190px;
    height: 270px;
}
</style>