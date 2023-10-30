import { defineStore } from 'pinia'
export const useUserStore = defineStore(
    'USER',
    () => {
        const user = ref()
        const setUser = (u: any) => (u.value = u)
        return { user, setUser }
    },
    {
        persist: true
    }
)
