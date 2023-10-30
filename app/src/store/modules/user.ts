import { defineStore } from 'pinia'
import { LoginUser } from '../types/user'
import { post } from '@/api/http'
import api from '@/api'

export const useUserStore = defineStore(
    'USER',
    () => {
        const user = reactive<LoginUser>({ uname: '', password: '' })
        const remember = ref(false)
        const setUser = ({ uname, password }: LoginUser) => {
            user.uname = uname
            user.password = password
        }
        const setRemember = ({ target: { checked } }: any) => {
            remember.value = checked
        }
        const login = (user: LoginUser) => {
            return new Promise((resolve, reject) =>
                post(api.login, user)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            )
        }

        return { login, user, remember, setRemember, setUser }
    },
    {
        persist: true
    }
)
