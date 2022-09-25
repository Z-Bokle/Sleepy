<template>
    <el-form :model="form" label-position="right" label-width="80px">
        <el-form-item :label="props.formTexts.email">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item :label="props.formTexts.password">
            <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item>
            <el-button type="primary">{{ props.formTexts.login }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

interface formTextsType {
    formTexts:{
        email: String,
        password: String,  
        login: String  
    }
}

const props = defineProps<formTextsType>()

const form = reactive({
    email: '',
    password: '',
})
</script>