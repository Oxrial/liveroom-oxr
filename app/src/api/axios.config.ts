import { Modal, message } from 'ant-design-vue'
import Axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { RequestConfig } from './http'
import { Result } from '@/core/types'
import { plainToClass } from 'class-transformer'
import { useUserStore } from '@/store'
import { getToken } from '@/utils'
import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
// import qs from 'qs'
// import Cookies from 'js-cookie'

export const CONTENT_TYPE = {
    APPLICATION_JSON: 'application/json',
    FORM_URLENCODED: 'application/x-www-form-urlencoded',
    TEXT_PLAIN: 'text/plain',
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
// service.defaults.headers.common['Content-Type'] = CONTENT_TYPE.APPLICATION_JSON

type WhiteList = Array<string | RegExp>
const WHITE_LIST_STRING: WhiteList = ['/login']
// const WHITE_LIST_REGEXP: WhiteList = [/^(?=.*\/user)\/user\/.*$/]
service.interceptors.request.use(
    async (req: AxiosRequestConfig) => {
        req.headers!['Content-Type'] = CONTENT_TYPE.APPLICATION_JSON
        if (!WHITE_LIST_STRING.includes(req.url + '')) req.headers!['Authorization'] = `Bearer ${getToken()}`
        return req as InternalAxiosRequestConfig<any>
    },
    err => {
        console.log(err)
        return Promise.reject(err)
    }
)
const checkCode = (data: any, msg = false) => {
    if (data.code === 1) {
        // success
        msg && message.success(data.msg)
    } else if (data.code === 0) {
        // null
        message.info(data.msg)
    } else if (data.code === 2) {
        message.error(data.msg)
    }
}
service.interceptors.response.use(
    (res: AxiosResponse) => {
        // const data = res.data
        const data = plainToClass(Result, res.data as Object) as typeof res.data
        checkCode(data, (res.config as RequestConfig).msg)
        return data
    },
    err => {
        if (err.response?.status === 401) {
            Modal.confirm({
                title: 'Confirm',
                icon: createVNode(ExclamationCircleOutlined),
                content: 'TOKEN 失效，请重新登录。',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    const userStore = useUserStore()
                    userStore.logout().then(() => location.reload())
                }
            })
        } else {
            message.error(err.msg, 5 * 1000)
        }
        console.log(err)
        return Promise.reject(err)
    }
)
export default service
