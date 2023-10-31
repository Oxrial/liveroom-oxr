import { defineStore } from 'pinia'
import { LoginUser } from '../types/user'
import { post } from '@/api/http'
import api from '@/api'
import { checkOk } from '@/api'
import type { Result } from '@/api'
import { setToken } from '@/utils'

const router = useRouter()
export const useUserStore = defineStore(
    'USER',
    () => {
        const user = reactive<LoginUser>({ uname: '', password: '', mobile: '' })
        const remember = ref(false)
        const setUser = ({ uname, password }: LoginUser) => {
            user.uname = uname
            user.password = password
        }
        const setRemember = ({ target: { checked } }: any) => {
            remember.value = checked
        }

        const login = (user: LoginUser) =>
            post(api.login, user).then(res => {
                if (!checkOk(res as Result)) return
                setUser(user)
                setToken((res as Result).data?.token)
                router.push('/')
            })
        return { login, user, remember, setRemember, setUser }
    },
    {
        persist: true
    }
)
