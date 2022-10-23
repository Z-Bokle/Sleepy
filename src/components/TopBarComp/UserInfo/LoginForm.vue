<template>
    <el-form :model="form" ref="formRef" :rules="rules" label-position="right" label-width="80px">
        <el-form-item :label="props.formTexts.email" prop="email">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item :label="props.formTexts.password" prop="password">
            <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit(formRef)">{{ props.formTexts.login }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, inject, type Ref, computed } from 'vue';
import { useStore } from 'vuex'
import axios from 'axios';
import {ElMessage, type FormInstance} from 'element-plus'
import qs from 'qs';

interface formTextsType {
    formTexts:{
        email: String,
        password: String,  
        login: String  
    }
}

const userDialogVisible = inject<Ref<Boolean>>('userDialogVisible')

const props = defineProps<formTextsType>()

const store = useStore()

const formRef = ref<FormInstance>()

const form = reactive({
    email: '',
    password: '',
})

const rules = {
    email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'}
    ]
}

const reset = (formRef: FormInstance | undefined) => {
    if(!formRef) return
    formRef.resetFields()
}

const login = (email: string, password: string) => {
    axios({
        method: 'post',
        url: '/user/login',
        data: qs.stringify({
            'email': email,
            'password': password
        }),
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then((res) => {
        if(res.status >= 200 && res.status < 300) {
            ElMessage(res.data.msg)
            if(res.data.status === 0) { //登录成功
                reset(formRef.value)
                userDialogVisible ? userDialogVisible.value = false : console.log('dialog错误')
                // 在vuex中记录用户信息
                store.commit('login',res.data.user)
            }
        } 
        else 
            ElMessage('登录失败')
    })
}

const submit = (formRef: FormInstance | undefined) => {
    if(!formRef) return
    formRef.validate((valid) => {
        if(valid) {
            login(form.email, form.password)
        } else {
            ElMessage('登录信息填写有误!')
            return false
        }
    })
}

</script>