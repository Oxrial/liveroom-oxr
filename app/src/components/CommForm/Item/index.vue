<template>
    <template v-for="item in forms">
        {{ item }}
        <slot v-if="item.slot" :name="resolveSlot(item.slot, item, modal)" :item="item" :modal="modal" />
        <AFormItem v-else v-bind="{ ...resolveFormItem(item), ...item.$fattrs }">
            <component :is="Antdv[item.type as keyof typeof Antdv]" v-bind="item.$attrs" v-model:value="modal[item.name]">
                <template v-if="item.stype">
                    <component v-for="option in item.stypeOptions" :is="item.stype" v-bind="item.$sattrs" :value="option.value">{{
                        option.label
                    }}</component>
                </template>
            </component>
        </AFormItem>
    </template>
</template>
<script setup lang="ts">
import * as Antdv from 'ant-design-vue/es/components'
import type { FormType } from '../types'
import { pick } from 'lodash-es'
interface ModalProp {
    [key: string]: any
}
defineProps<{ forms: FormType[]; modal: ModalProp }>()
const resolveFormItem = (item: FormType) => pick(item, 'label', 'name', 'rules')
const slots = reactive<{ [key: string]: object }>({})
const resolveSlot = (slot: string, item: FormType, modal: ModalProp) => {
    slots[slot] = { item, modal }
    return slot
}
defineExpose({ slots })
</script>

<style lang="scss" scoped></style>
