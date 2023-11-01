import { Cookie } from '@/utils'
import { defineStore } from 'pinia'
const settingKey = {
    SIDE: '-SIDE_STATUS-'
}
export const useSettingStore = defineStore('SETTING', () => {
    const sideIsActive = ref(Cookie.get(settingKey.SIDE) || false)

    const toggleSide = () => {
        sideIsActive.value = !sideIsActive.value
        Cookie.set(settingKey.SIDE, sideIsActive.value)
    }

    const closeSide = () => {
        sideIsActive.value = false
    }
    const clearSide = () => Cookie.remove(settingKey.SIDE)
    return {
        sideIsActive,
        toggleSide,
        closeSide,
        clearSide
    }
})
