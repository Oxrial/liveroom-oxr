import { defineStore } from 'pinia'
import { LoginUser } from '../types/user'
import { post } from '@/api/http'
import api from '@/api'
import { checkOk } from '@/api'
import type { Result } from '@/api'
import { removeToken, setToken, Storage } from '@/utils'
type LoginUserInfo = Omit<LoginUser, 'mobile'>
const userKey = {
    remember: '-REMEMBER-'
}
export const useUserStore = defineStore(
    'USER',
    () => {
        const user = ref<LoginUserInfo | null>(null)
        const remember = ref(false)
        const token = ref()
        const setUser = (loginUserInfo: LoginUserInfo) => {
            user.value = loginUserInfo
        }
        const getUser = () => user.value
        const setRemember = ({ target: { checked } }: any) => {
            remember.value = checked
        }

        const login = (user: LoginUserInfo) => {
            const promise = post(api.login, user)
            promise.then(res => {
                if (!checkOk(res as Result)) return
                setUser(user)
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
        const clearStorage = () => {
            removeToken()
            token.value = ''
            user.value = null
            // const needClearStorage = ['token']
            const isRememberMe = Storage.get(userKey.remember)
            if (isRememberMe) return
            // needClearStorage.forEach(key => Storage.remove(key))
        }
        return { login, logout, user, getUser, remember, setRemember, setUser }
    },
    {
        persist: true
    }
)
