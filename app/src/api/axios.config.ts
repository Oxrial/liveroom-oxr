import Axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// import qs from 'qs'
// import Cookies from 'js-cookie'

export const CONTENT_TYPE = {
    CONTENT_TYPE: 'Content-Type',
    APPLICATION_JSON: 'application/json; charset=utf-8',
    FORM_URLENCODED: 'application/x-www-form-urlencoded',
    TEXT_PLAIN: 'text/plain; charset=utf-8',
    MULTIPART_FORM_DATA: 'multipart/form-data',
    APPLICATION_OCTET_STREAM: 'application/octet-stream'
}
// 创建一个Axios实例，设置超时时间和是否携带凭证
const service = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10 * 60 * 1000,
    withCredentials: false
})
const WHITE_LIST = ['/login', '/user']
service.interceptors.request.use((req: AxiosRequestConfig) => {
    console.log(import.meta.env)
    console.log('🚀 ~ file: axios.config.ts:25 ~ service.interceptors.request.use ~ req>>> :', req)

    const { pathname } = new URL(req.url!)
    console.log(pathname)
    return req as InternalAxiosRequestConfig<any>
})
export default service
