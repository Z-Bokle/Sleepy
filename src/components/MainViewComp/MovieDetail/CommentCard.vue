<template>
    <el-card class="card">
        <template #header>
            <div class="card-header">
                <span class="head-text">情感强度:{{ valence }}</span>

                <span class="head-text">可读性:{{ readability.toFixed(2) }}</span>
            </div>
        </template>
            <div class="comment-text">
                {{ text }}
            </div>
    </el-card>
</template>

<script lang="ts" setup>

const props = defineProps(["readability", "valence", "text"])

</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@font-face {
    font-family: 'MiSans-SemiBold';
    src: url('../../../assets/fonts/MiSans-SemiBold.ttf');
}
.head-text {
    font-size: 1.2em;
    font-family: MiSans-SemiBold;
}
.card {
    margin-top: 10px;
}
</style>