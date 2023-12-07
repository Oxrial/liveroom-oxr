<template>
    <template v-for="item in form">
        {{ renderCheck() }}
        <template v-if="item.slot">
            <slot :name="resolveSlot(item.slot)" :item="item" :model="model" />
        </template>
        <AFormItem v-else v-bind="{ ...resolveFormItem(item), ...item.$fattrs }">
            <component :is="Antdv[item.type as keyof typeof Antdv]" v-bind="item.$attrs" v-model:value="model[item.name]">
                <template v-if="item.children">
                    <component
                        :is="Antdv[item.children.type as keyof typeof Antdv]"
                        v-for="option in item.children.options"
                        v-bind="item.children.$attrs"
                        :value="option.value"
                    >
                        {{ option.label }}
                    </component>
                </template>
            </component>
        </AFormItem>
    </template>
</template>
<script setup lang="ts">
import * as Antdv from 'ant-design-vue/es/components'
import { _renderCheck } from '@/utils'
import type { FormProps, FormItemProps } from '../types'
import { pick } from 'lodash-es'

const prop = defineProps<FormProps & { renderStr?: string }>()

const emit = defineEmits(['update-slots'])

const resolveFormItem = (item: FormItemProps) => pick(item, 'label', 'name', 'rules')
const resolveSlot = (slot: string) => {
    emit('update-slots', slot)
    return slot
}
const renderCheck = _renderCheck(prop.renderStr || 'item')
</script>

<style lang="scss" scoped></style>
