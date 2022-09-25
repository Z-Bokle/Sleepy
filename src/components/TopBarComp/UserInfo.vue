<!-- 该组件包含用户信息展示和注册登录逻辑 -->
<template>
    <div class="user-data">
        <el-popover placement="bottom-end">
            <template #reference>
                <el-avatar @click="userDialogVisible = true"></el-avatar>
            </template>
            <span>这里展示用户个人信息捏</span>
        </el-popover>
    </div>

    <el-dialog v-model="userDialogVisible" :title="tabTexts.title">
        <el-tabs :tab-position="'left'">
            <el-tab-pane :label="tabTexts.regiser">
                <register-form :form-texts="tabTexts.formTextsRegister"></register-form>
            </el-tab-pane>
            <el-tab-pane :label="tabTexts.login">
                <login-form :form-texts="tabTexts.formTextsLogin"></login-form>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import RegisterForm from './UserInfo/RegisterForm.vue';
import LoginForm from './UserInfo/LoginForm.vue';

const userDialogVisible = ref(false);

const tabTexts = {
    title:'注册 / 登录',
    regiser:'注册',
    login:'登录',
    formTextsRegister:{
        register:'注册',
        email:'邮箱',
        password:'密码',
        againPassword:'重复密码',
        code:'验证码',
        getCode:'获取验证码',
        name:'用户名'
    },
    formTextsLogin:{
        login:'登录',
        email:'邮箱',
        password:'密码',
    }
}

</script>

<style scoped>
.user-data{
    display: flex;
    margin-right: 20px;
}
</style>