<template>
    <a-row class="login-main">
        <a-col :span="12" />
        <a-col :span="12" class="login-box">
            <a-form
                :model="loginData"
                name="basic"
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
                        <component v-model:value="loginData[prop as keyof LoginInfo] " :is="tag" v-bind="$attrs" v-on="$listeners" />
                    </a-form-item>
                </template>

                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="loginData.remember" @change="(v:boolean) => userStore.setRemember(v)">Remember me</a-checkbox>
                </a-form-item>
                <div style="height: 3em" />
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button size="large" class="login-btn" type="primary" html-type="submit">登&emsp;录</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import type { LoginUser, LoginInfo } from '@/store'
import { omit } from 'lodash-es'
import { Input, InputPassword } from 'ant-design-vue'
import { checkOk } from '@/api'
import type { Result } from '@/api'

const userStore = useUserStore()
const loginData: LoginInfo = reactive({
    uname: '',
    password: '',
    remember: userStore.remember
})
const login = () => {
    userStore.setUser(loginData)
    const loginSubmit = omit(loginData, ['remember'])
    userStore.login(loginSubmit as LoginUser).then(res => {
        checkOk(res as Result) && useRouter
    })
}
const loginForm = [
    {
        label: '用户名',
        prop: 'uname',
        tag: Input,
        rules: [{ required: true, message: 'Please input your username!' }]
    },
    {
        label: '密码',
        prop: 'password',
        tag: InputPassword,
        $attrs: {
            readonly: true,
            onfocus: "this.removeAttribute('readonly');",
            onblur: "this.setAttribute('readonly', true);"
        },
        $listeners: {
            'keyup.enter.native': login
        },
        rules: [{ required: true, message: 'Please input your password!' }]
    }
]
</script>

<style scoped lang="scss">
.login-main {
    height: 100vh;
    background-color: #6d6a6a;
    .login-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .ant-form {
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
            :deep([class$='-input-content']) > * {
                border-radius: 15px;
            }
            .login-btn {
                min-width: 50%;
                border-radius: 20px;
            }
        }
    }
}
</style>
