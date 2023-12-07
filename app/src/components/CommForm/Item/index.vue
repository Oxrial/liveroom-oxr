<template>
    <template v-for="item in forms">
        <!-- {{ item }} -->
        <template v-if="item.slot">
            <slot :name="resolveSlot(item.slot)" :item="item" :modal="modal" />
        </template>
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
const emit = defineEmits(['update-slots'])
const resolveFormItem = (item: FormType) => pick(item, 'label', 'name', 'rules')
const resolveSlot = (slot: string) => {
    console.log('>>>', slot)
    emit('update-slots', slot)
    return slot
}
</script>

<style lang="scss" scoped></style>
