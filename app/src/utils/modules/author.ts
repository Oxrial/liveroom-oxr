import { Cookie } from '@/utils'
import api, { checkOk } from '@/api'
import { useGet } from '@/hooks'
import { useUserStore } from '@/store'
import { Result } from '@/core/types'

const TokenKey = '-LIVEROOM-OXR-'

export function getToken() {
    return Cookie.get(TokenKey)
}

export function setToken(token: string) {
    return Cookie.set(TokenKey, token)
}

export function removeToken() {
    return Cookie.remove(TokenKey)
}

export const getPublicKey = () => {
    useGet(api.rsa).then(res => {
        if (!checkOk(res)) return
        const userStore = useUserStore()
        userStore.setPublicKey((res as Result).data)
    })
}
