import { Cookie } from '@/utils'

const TokenKey = '-LIVEROOM-OXR-'

export function getToken() {
    return Cookie.get(TokenKey)
}

export function setToken(token: string) {
    return Cookie.set(TokenKey, token)
}

export function removeToken() {
    console.log(TokenKey)
    return Cookie.remove(TokenKey)
}
