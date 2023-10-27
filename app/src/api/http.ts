import service from './axios.config'

function http(url: string, data: any, method: string, headers: any, beforeFunc?: () => void) {
    beforeFunc && beforeFunc()
    return service({ method, url, params: data, headers })
}
export function get(url: string, data = {}, beforeFunc?: () => void) {
    return http(url, data, 'GET', null, beforeFunc)
}
export function post(url: string, data: any, headers: any, beforeFunc: () => void) {
    return http(url, data, 'POST', headers, beforeFunc)
}
