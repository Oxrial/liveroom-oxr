import { Cookie } from '@/utils'
import { defineStore } from 'pinia'
const settingKey = {
    SIDE: '-SIDE_STATUS-',
    MENU_SELECTED: '-MENU_SELECTED-',
    MENU_OPEN: '-MENU_OPEN-'
}
export const useSettingStore = defineStore('SETTING', () => {
    const sideIsActive = ref(Cookie.get(settingKey.SIDE) || false)
    const menuSelected = ref(Cookie.get(settingKey.MENU_SELECTED) || ['Home'])
    const menuOpen = ref(Cookie.get(settingKey.MENU_OPEN) || [])

    const setMenuOpen = (val: string) => {
        menuOpen.value = val
        Cookie.set(settingKey.MENU_OPEN, val)
    }
    const setMenuSelected = (val: string) => {
        menuSelected.value = val
        Cookie.set(settingKey.MENU_SELECTED, val)
    }

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
        menuSelected,
        menuOpen,
        setMenuSelected,
        setMenuOpen,
        toggleSide,
        closeSide,
        clearSide
    }
})
