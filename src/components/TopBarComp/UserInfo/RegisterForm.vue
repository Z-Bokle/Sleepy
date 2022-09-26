<template>
    <el-form :model="form" ref="formRef" :rules="rules" label-position="right" label-width="80px">
        <el-form-item :label="props.formTexts.name" prop="name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item :label="props.formTexts.email" prop="email">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item :label="props.formTexts.code" prop="code">
            <el-input v-model="form.code">
                <template #append>
                    <el-button @click="getCode(form.email)">{{ props.formTexts.getCode }}</el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item :label="props.formTexts.password" prop="password">
            <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item :label="props.formTexts.againPassword" prop="againPassword">
            <el-input v-model="form.againPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit(formRef)">{{ props.formTexts.register }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, inject, type Ref } from 'vue';
import axios from 'axios';
import {ElMessage, type FormInstance} from 'element-plus'
import qs from 'qs';

interface formTextsType {
    formTexts:{
        name: String,
        email: String,
        code: String,
        password: String,
        againPassword: String,
        getCode: String,    
        register: String  
    }
}

const userDialogVisible = inject<Ref<Boolean>>('userDialogVisible')

const props = defineProps<formTextsType>()

const formRef = ref<FormInstance>()

const form = reactive({
    name: '',
    email: '',
    password: '',
    againPassword: '',
    code: ''
})

// 检查密码输入的自定义规则
const checkPassword = (rule: any, value: string, callback: any) => {
    console.log(value)
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (!value.match('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@&%#_]{8,16}$')) {
        callback(new Error('密码8到16位，至少包含一个大写字母和一个小写字母!'))
    } else {
        callback()
    }
}

// 检查重复密码输入的自定义规则
const checkAgainPassword = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if(value !== form.password) {
        callback(new Error('两次密码输入不一致!'))
    } else {
        callback()
    }
}

// 检查表单输入的自定义规则
const rules = {
    name: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {max: 20, message: '用户名长度不能超过20' ,trigger: 'blur'},
    ],
    email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'}
    ],
    password: [
        {required: true, validator: checkPassword, trigger: 'blur'}
    ],
    againPassword: [
        {required: true, validator: checkAgainPassword, trigger: 'blur'}
    ],
    code: [
        {required: true, message: '请输入验证码', trigger: 'blur'}
    ]
}

// 获取验证码
const getCode = (email: string) => {
    axios({
        method: 'post',
        url: '/user/code',
        data: qs.stringify({'email':email}),
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then((res) => {
        if(res.status >= 200 && res.status < 300) {
            ElMessage(res.data.msg)
        }
        else 
            ElMessage('获取验证码失败')
    })
}

// 注册
const register = (name: string, email: string, code: string, password: string) => {
    axios({
        method: 'post',
        url: '/user/register',
        data: qs.stringify({
            'name': name,
            'email': email,
            'code': code,
            'password': password
        }),
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then((res) => {
        if(res.status >= 200 && res.status < 300) {
            ElMessage(res.data.msg)
            if(res.data.status === 0) // 注册成功
                userDialogVisible ? userDialogVisible.value = false : console.log('dialog错误')
        }
        else 
            ElMessage('注册失败')
    })
}

// 提交表单
const submit = (formRef: FormInstance | undefined) => {
    if(!formRef) return
    formRef.validate((valid) => {
        if(valid) {
            register(form.name,form.email,form.code,form.password)
        } else {
            ElMessage('注册信息填写有误!')
            return false
        }
    })
}
</script>