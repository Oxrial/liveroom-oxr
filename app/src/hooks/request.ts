import { http } from '@/api'

export function useGet(url: string, data = {}, msg = false, headers?: any, beforeFunc?: () => void) {
    return http(url, { params: data }, 'GET', msg, headers, beforeFunc)
}
export function usePost(url: string, data: any, msg = false, headers?: any, beforeFunc?: () => void) {
    return http(url, { data }, 'POST', msg, headers, beforeFunc)
}
