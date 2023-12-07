<template>
    <template v-if="hasOneChild(props.item) && (!onlyOneChild.children || onlyOneChild.nonChildren)">
        <AMenuItem :key="resolvePath(onlyOneChild.path)">
            <span v-if="item.meta?.svg" role="img" class="anticon">
                <SvgIcon :name="item.meta.svg" :color="item.meta.color" />
            </span>
            <component v-else-if="item.meta?.icon" :is="item.meta.icon" />
            <span> {{ onlyOneChild.meta.title }}</span>
        </AMenuItem>
    </template>
    <ASubMenu v-else :key="resolvePath(item.path)">
        <template #title>
            <SvgIcon v-if="item.meta?.svg" :name="item.meta.svg" :color="item.meta.color" />
            <component v-else-if="item.meta?.icon" :is="item.meta.icon" />
            <span v-if="item.meta">{{ item.meta.title }}</span>
        </template>
        <MenuSub v-for="child in item.children" :key="child.path" :item="child" :parent-path="resolvePath(item.path)" />
    </ASubMenu>
</template>
<script setup lang="ts">
import type { Route } from '@/layout/types'
import { PropType } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
defineOptions({
    name: 'MenuSub'
})
const props = defineProps({
    item: {
        type: Object as PropType<Route>,
        required: true
    },
    parentPath: {
        type: String,
        default: ''
    }
})
// const { item } = props
const onlyOneChild = ref()
const hasOneChild = (route: Route) => {
    let chid = []
    if (route.children) {
        chid = route.children.filter((r: Route) => {
            if (!r.meta?.hidden) {
                onlyOneChild.value = r
                return true
            } else return false
        })
    }
    if (chid.length === 1) return true
    if (chid.length === 0) {
        onlyOneChild.value = { ...route, nonChildren: true }
        return true
    }
}
const isExternal = (path: string) => {
    return /^(https?:|mailto:|tel:)/.test(path)
}
const resolvePath = (routePath: string) => {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.parentPath)) {
        return props.parentPath
    }
    return `${props.parentPath ? props.parentPath + '/' : props.parentPath}${routePath}`
}
</script>

<style lang="scss" scoped></style>
