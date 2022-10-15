<!-- MovieItem加载时的展示 -->
<template>
  <el-card class="card">
        <el-row :gutter="30">
            <el-col :span="10">
				<el-skeleton-item variant="image" style="width: 150px; height: 200px" />
            </el-col>
            <el-col :span="14">
                <el-row :gutter="10" style="margin-bottom: 75px;">
                    <el-col :span="12">
                        <el-skeleton-item variant="h3" />
                    </el-col>
                    <el-col :span="8" :offset="4">
                        <el-skeleton-item variant="h1" />
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="18"><el-skeleton-item variant="text" /></el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12"><el-skeleton-item variant="text" /></el-col>
                    <el-col :span="12"><el-skeleton-item variant="text" /></el-col>					
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8"><el-skeleton-item variant="text" /></el-col>
                    <el-col :span="16"><el-skeleton-item variant="text" /></el-col>					
                </el-row>	
                <el-row :gutter="10">
                    <el-col :span="24"><el-skeleton-item variant="text" /></el-col>
                </el-row>		
				<el-row :gutter="10">
                    <el-col :span="24"><el-skeleton-item variant="text" /></el-col>
                </el-row>										
            </el-col>
        </el-row>
    </el-card>
</template>
<style scoped>
.card {
    width: 420px;
    height: 240px;
}
</style>