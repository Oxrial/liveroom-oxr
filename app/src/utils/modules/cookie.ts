import Cookies from 'js-cookie'

const Cookie = {
    set(key: string, value: any) {
        Cookies.set(key, JSON.stringify(value))
    },
    get(key: string) {
        try {
            const value = Cookies.get(key)
            if (value === null || value === undefined || value === '') {
                return null
            }
            return JSON.parse(value)
        } catch (error) {
            console.log(error)
        }
    },
    remove(key: string) {
        Cookies.remove(key)
    }
}
export { Cookie }
