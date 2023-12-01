import { defineStore } from 'pinia'
import { LoginUserInfo } from '../types/user'
import { usePost, useGet } from '@/hooks'
import api, { checkOk } from '@/api'
import type { Result } from '@/api'
import { removeToken, setToken as setSessionToken, getToken as getSessionToken, Storage } from '@/utils'
import { useLocalStorage } from '@vueuse/core'
const userKey = {
    remember: '-REMEMBER-'
}
export const useUserStore = defineStore(
    'USER',
    () => {
        const publicKey = ref<string>('')
        const setPublicKey = (key: string) => (publicKey.value = key)

        const uname = ref<string>('')
        const setUname = (suname: string) => (uname.value = suname)

        const remember = ref<boolean>(false)
        const setRemember = (checked: boolean) => (remember.value = checked)

        const token = ref<string>(getSessionToken() || '')

        const login = (user: LoginUserInfo) => {
            const promise = usePost(api.login, user, true)
            promise.then(res => {
                if (!checkOk(res)) return
                setSessionToken((res as Result).data?.token)
                useLocalStorage('RememberForm', user)
            })
            return promise
        }
        const logout = () => {
            const promise = useGet(api.logout)
            promise.then(() => clearStorage())
            return promise
        }
        const loadingUser = () => {
            const promise = useGet(api.user)
            promise.then(res => {
                if (!checkOk(res)) return
                setUname((res as Result).data.uname)
            })
            return promise
        }
        const clearStorage = () => {
            removeToken()
            uname.value = ''
            // const needClearStorage = ['token']
            const isRememberMe = Storage.get(userKey.remember)
            if (isRememberMe) return
            // needClearStorage.forEach(key => Storage.remove(key))
        }
        return { publicKey, setPublicKey, uname, setUname, remember, setRemember, token, login, logout, loadingUser }
    },
    {
        persist: [
            {
                key: 'REMEMBER',
                paths: ['remember'],
                storage: localStorage
            }
        ]
    }
)
