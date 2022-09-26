<!-- 该组件包含用户信息展示和注册登录逻辑 -->
<template>
    <div class="user-data">
        <el-popover placement="bottom-end">
            <template #reference>
                <el-link type="primary" @click=" !userLogin ? userDialogVisible = true : ''">{{ userGreeting }}</el-link>
            </template>
            <div>{{ userDesc }}</div>
        </el-popover>
    </div>

    <el-dialog v-model="userDialogVisible" :title="tabTexts.title">
        <el-tabs :tab-position="'left'">
            <el-tab-pane :label="tabTexts.login">
                <login-form :form-texts="tabTexts.formTextsLogin"></login-form>
            </el-tab-pane>
            <el-tab-pane :label="tabTexts.register">
                <register-form :form-texts="tabTexts.formTextsRegister"></register-form>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, provide, type Ref, computed, onMounted } from 'vue';
import RegisterForm from './UserInfo/RegisterForm.vue';
import LoginForm from './UserInfo/LoginForm.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const userDialogVisible = ref(false);

const store = useStore()
// 用户信息描述
const userDesc = computed(() => store.getters.getUserDesc())
// 用户问候语
const userGreeting = computed(() => store.getters.getUserGreeting())
// 用户登录状态
const userLogin = computed(() => store.state.account.login)

provide<Ref<Boolean>>('userDialogVisible', userDialogVisible)

const tabTexts = {
    title:'注册 / 登录',
    register:'注册',
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

// 自动登录
onMounted(() => {
    axios({
        method:'post',
        url:'/user/check-token'
    })
    .then((res) => {
        if(res.status >= 200 && res.status < 300) {
            ElMessage(res.data.msg)
            if(res.data.status === 0) { // 自动登录成功
                userDialogVisible ? userDialogVisible.value = false : console.log('dialog错误')
                // 在vuex中记录用户信息
                store.commit('login',res.data.user)
            }
        }
    })
})

</script>

<style scoped>
.user-data{
    display: flex;
    margin-right: 20px;
}
</style>