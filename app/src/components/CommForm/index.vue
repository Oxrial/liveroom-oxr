<template>
    <!-- @finish="(values:any) => emit('finish', values)" -->
    <AForm ref="commFormRef" v-bind="$attrs" :model="model">
        {{ renderCheck() }}
        <Item :form="form" :model="model" @update-slots="updateSlots">
            <template v-for="slot in slots" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="(scope as SlotScope)" />
            </template>
        </Item>
        <AFormItem class="form-operation">
            <AButton type="primary" @click="(e:MouseEvent) => submit(e)">提交</AButton>
            <AButton type="primary" @click="(e:MouseEvent) => submit(e, '_RESET_')">重置</AButton>
        </AFormItem>
    </AForm>
</template>

<script setup lang="ts">
import Item from './Item/index.vue'
import type { FormProps, SlotScope } from './types'
import { FormInstance } from 'ant-design-vue'
import { _renderCheck } from '@/utils'

const props = withDefaults(defineProps<FormProps>(), {})
const emit = defineEmits<{
    submit: [data?: object, e?: MouseEvent]
    reset: []
    finish: [values: any]
}>()

const slots = ref<Array<string>>([])
const updateSlots = (slot: string) => !slots.value.includes(slot) && slots.value.push(slot)

const renderCheck = _renderCheck('>>> comm')

const commFormRef = ref<FormInstance | null>(null)
const submit = (e: MouseEvent, type?: string) => {
    if (type === '_RESET_') {
        commFormRef.value?.resetFields()
        emit('reset')
        return emit('submit')
    }
    commFormRef.value?.validate().then(() => {
        emit('submit', toRaw(props.model), e)
    })
}
</script>

<style lang="scss" scoped>
.form-operation {
    .ant-btn + .ant-btn {
        margin-left: 1.25rem;
    }
}
</style>
