import { defineStore } from 'pinia'
import { LoginUserInfo } from '../types/user'
import { post, get } from '@/api/http'
import api from '@/api'
import { checkOk } from '@/api'
import type { Result } from '@/api'
import { removeToken, setToken, Storage } from '@/utils'
const userKey = {
    remember: '-REMEMBER-'
}
export const useUserStore = defineStore(
    'USER',
    () => {
        const user = ref()
        const remember = ref(false)
        const token = ref<string>()
        const getToken = () => token.value

        const setUser = (u: any) => {
            user.value = u
        }
        const getUser = () => toRaw(user.value)
        const setRemember = ({ target: { checked } }: any) => {
            remember.value = checked
        }

        const login = (user: LoginUserInfo) => {
            const promise = post(api.login, user)
            promise.then(res => {
                if (!checkOk(res as Result)) return
                token.value = (res as Result).data?.token
                setToken((res as Result).data?.token)
            })
            return promise
        }
        const logout = () => {
            const promise = post(api.logout, { token: token.value })
            promise.then(() => {
                clearStorage()
            })
            return promise
        }
        const loadingUser = (uid: string) => {
            const promise = get(api.getUserByUID(uid))
            promise.then(res => {
                return checkOk(res as Result) && setUser((res as Result).data)
            })
            return promise
        }
        const clearStorage = () => {
            removeToken()
            token.value = ''
            user.value = null
            // const needClearStorage = ['token']
            const isRememberMe = Storage.get(userKey.remember)
            if (isRememberMe) return
            // needClearStorage.forEach(key => Storage.remove(key))
        }
        return { login, logout, loadingUser, getToken, getUser, remember, setRemember, setUser }
    },
    {
        persist: true
    }
)
