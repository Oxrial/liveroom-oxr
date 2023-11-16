<template>
    <a-row class="lro-login">
        <a-col :span="12" />
        <a-col :span="12" class="lro-login__content">
            <a-form
                :model="loginData"
                ref="loginRef"
                name="login"
                label-align="left"
                :colon="false"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                hide-required-mark
                @finish="login"
            >
                <div class="title">LIVEROOM</div>
                <template v-for="{ label, prop, tag, rules, $attrs = {}, $listeners = {} } in loginForm">
                    <a-form-item :label="label" :name="prop" :rules="rules">
                        <component v-model:value="(loginData[prop as keyof LoginUser] as any)" :is="tag" v-bind="$attrs" v-on="$listeners" />
                    </a-form-item>
                </template>
                <div class="operation-conent">
                    <a-checkbox v-model:checked="remember" @change="(e: CheckboxChangeEvent) => userStore.setRemember(e)"> Remember me </a-checkbox>
                    <a-button type="link" @click="forgetPWD">忘记密码</a-button>
                </div>
                <div style="height: 3em" />
                <a-form-item :wrapper-col="{ offset: 0, span: 24 }" style="text-align: center">
                    <a-button size="large" class="login-btn" type="primary" html-type="submit">登&emsp;录</a-button>
                    <br />
                    <a-tooltip placement="right">
                        <template #title>请输入手机号注册</template>
                        <a-button type="link" :disabled="!loginData.mobile" @click="register">注册</a-button>
                    </a-tooltip>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import type { LoginUser, LoginUserInfo } from '@/store'
import { Input, InputPassword } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { checkOk } from '@/api'
import type { Result } from '@/api'
import _v from 'validator'
import { post } from '@/api/http'
import api from '@/api'
import { CheckboxChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
import { Storage } from '@/utils'

const loginRef = ref<FormInstance>()
const userStore = useUserStore()
const loginData: LoginUser = reactive({
    uname: '',
    mobile: '',
    password: ''
})
const loginSubmit: LoginUserInfo = reactive({ uname: '', password: '' })
const remember = ref(userStore.remember)

const rememberResolve = () => {
    const loginForm = Storage.get('USER')?.user
    if (!loginForm) return
    loginData.uname = loginForm.uname
    loginData.password = '-REMEMBER-'
    resolveData(loginForm)
}
onMounted(rememberResolve)
const router = useRouter()
const route = useRoute()
const resolveData = ({ uname, password }: LoginUser) => {
    loginSubmit.uname = uname
    loginSubmit.password = password
}
const login = () =>
    userStore.login(loginSubmit).then(res => {
        checkOk(res as Result) &&
            userStore.loadingUser((res as Result).data.uid).then(ures => {
                checkOk(ures as Result) && router.replace({ path: (route.query.redirect as string | null) || '/' })
            })
    })

const loginForm = [
    {
        label: '用户名',
        prop: 'uname',
        tag: Input,
        $attrs: { placeholder: '请输入用户名/手机号', style: { 'border-radius': '20px', height: '40px' } },
        $listeners: {
            change: (e: any) => {
                loginData.mobile = _v.isMobilePhone(e.target.value, 'zh-CN') ? e.target.value : ''
                loginSubmit.uname = e.target.value
            }
        },
        rules: [{ required: true, message: 'Please input your username!' }]
    },
    {
        label: '密\t码',
        prop: 'password',
        tag: InputPassword,
        $attrs: {
            readonly: true,
            placeholder: '请输入密码',
            style: { 'border-radius': '20px', height: '40px' },
            onfocus: "this.removeAttribute('readonly');",
            onblur: "this.setAttribute('readonly', true);"
        },
        $listeners: {
            'keyup.enter.native': login,
            change: (e: any) => {
                loginSubmit.password = e.target.value
            }
        },
        rules: [{ required: true, message: 'Please input your password!' }]
    }
]

const forgetPWD = () => {}
const register = () => {
    post(api.register, loginData).then(res => {
        if (!checkOk(res as Result)) return
        const uname = loginData.uname
        loginRef.value?.resetFields()
        loginData.uname = uname
    })
}
</script>

<style scoped lang="scss">
@include block(login) {
    height: 100vh;
    background-color: #6d6a6a;
    @include elem(content) {
        display: flex;
        justify-content: center;
        align-items: center;
        :deep(.ant-form) {
            min-width: 50%;
            padding: 40px 60px;
            border-radius: 5px;
            background-color: #fff;
            .title {
                text-align: center;
                font-size: 25px;
                font-weight: bold;
                margin: 10px 0 20px;
            }
            .operation-conent {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .login-btn {
                min-width: 60%;
                border-radius: 20px;
                margin-bottom: 20px;
            }
        }
    }
}
</style>
