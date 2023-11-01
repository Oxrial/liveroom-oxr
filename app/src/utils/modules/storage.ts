const Storage = {
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key: string) {
        try {
            const value = localStorage.getItem(key)
            if (value === null || value === undefined || value === '') {
                return null
            }
            return JSON.parse(value)
        } catch (error) {
            console.log(error)
        }
    },
    remove(key: string) {
        localStorage.removeItem(key)
    },
    removeAll() {
        localStorage.clear()
    }
}
export { Storage }
