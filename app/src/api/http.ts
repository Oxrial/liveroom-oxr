import { AxiosRequestConfig } from 'axios'
import service from './axios.config'
export type RequestConfig = { msg: boolean } & AxiosRequestConfig
function http(url: string, data: any, method: string, msg: boolean, headers: any, beforeFunc?: () => void) {
    beforeFunc && beforeFunc()
    return new Promise((resolve, reject) => {
        service({ method, url, ...data, headers, msg } as RequestConfig)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}
export function get(url: string, data = {}, msg = true, headers?: any, beforeFunc?: () => void) {
    return http(url, { params: data }, 'GET', msg, headers, beforeFunc)
}
export function post(url: string, data: any, msg = true, headers?: any, beforeFunc?: () => void) {
    return http(url, { data }, 'POST', msg, headers, beforeFunc)
}
