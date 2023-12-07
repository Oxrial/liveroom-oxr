<template>
    {{ modelData }}
    <ACard>
        <CommForm :form="testForm" :model="modelData">
            <template #a="{ item, model }">
                <!-- <ASpace wrap> -->
                <Item :form="item.items!" :model="model" render-str="a-str-item" />
                <!-- </ASpace> -->
            </template>
        </CommForm>
    </ACard>
    <AButton @click="tes">1</AButton>
</template>

<script setup lang="ts">
import type { FormItemProps } from '@/components/CommForm/types'
import Item from '@/components/CommForm/Item/index.vue'

const testForm = ref<Array<FormItemProps>>([
    {
        label: '姓名',
        name: 'name',
        type: 'Input',
        $attrs: {},
        rules: [
            {
                required: true
            }
        ]
    },
    {
        label: '性别',
        name: 'gender',
        type: 'Select',
        $attrs: {
            // options: [
            //     { value: '0', label: '女' },
            //     { value: '1', label: '男' }
            // ]
        },
        children: {
            type: 'SelectOption',
            options: [
                { value: '0', label: '女' },
                { value: '1', label: '男' }
            ]
        },
        rules: [
            {
                required: true
            }
        ]
    },
    {
        label: 'a',
        name: 'a',
        type: 'Input',
        slot: 'a',
        items: [
            {
                label: 'a姓名',
                name: 'aname',
                type: 'Input',
                $attrs: {},
                rules: [
                    {
                        required: true
                    }
                ]
            },
            {
                label: 'b姓名',
                name: 'bname',
                type: 'Input',
                $attrs: {},
                rules: [
                    {
                        required: true
                    }
                ]
            }
        ]
    }
])
const modelData = reactive({
    name: 'aa',
    gender: '1',
    a: 'b1',
    aname: 'saa',
    bname: 'ssb'
})
const tes = () => {
    testForm.value[0].label = '2'
}
</script>

<style lang="scss" scoped></style>
