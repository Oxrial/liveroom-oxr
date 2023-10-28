import { message } from 'ant-design-vue'
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
    withCredentials: false,
    headers: {
        'Content-Type': CONTENT_TYPE.APPLICATION_JSON
    }
})
type WhiteList = Array<string | RegExp>
const WHITE_LIST_STRING: WhiteList = ['/login']
// const WHITE_LIST_REGEXP: WhiteList = [/^(?=.*\/user)\/user\/.*$/]
service.interceptors.request.use(
    async (req: AxiosRequestConfig) => {
        if (!WHITE_LIST_STRING.includes(req.url + '')) req.headers!['Authorization'] = `Bearer ${'token'}`
        return req as InternalAxiosRequestConfig<any>
    },
    err => {
        console.log(err)
        return Promise.reject(err)
    }
)
const checkCode = (data: any) => {
    if (data.code === 1) {
        // success
        message.success(data.msg)
    } else if (data.code === 0) {
        // null
        message.info(data.msg)
    }
}
service.interceptors.response.use(
    (res: AxiosResponse) => {
        const data = res.data
        checkCode(data)
        return data
    },
    err => {
        if (err.response?.status === 401) {
        } else {
            message.error(err.msg, 5 * 1000)
        }
        console.log(err)
        return Promise.reject(err)
    }
)
export default service
