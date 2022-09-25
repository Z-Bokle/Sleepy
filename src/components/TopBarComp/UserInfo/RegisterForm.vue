<template>
    <el-form :model="form" :rules="rules" label-position="right" label-width="80px">
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
            <el-button type="primary">{{ props.formTexts.register }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex'

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

const props = defineProps<formTextsType>()

// vuex中存放url前缀
const store = useStore()
const urlPrefix = computed(() => store.state.urlPrefix)

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

const getCode = async (email:string) => {
    let res = await axios.post(`/user/code`,{email:email})
    console.log(res)
}
</script>