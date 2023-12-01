import { AxiosRequestConfig } from 'axios'
import service from './axios.config'
export type RequestConfig = { msg: boolean } & AxiosRequestConfig
export function http(url: string, data: any, method: string, msg: boolean, headers: any, beforeFunc?: () => void) {
    beforeFunc && beforeFunc()
    return new Promise((resolve, reject) => {
        service({ method, url, ...data, headers, msg } as RequestConfig)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}
