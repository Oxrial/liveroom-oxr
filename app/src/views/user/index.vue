<template>
    {{ modelData }}
    <ACard>
        <CommForm :form="testForm" :model="modelData">
            <template #a="{ item, model }">
                <div class="temp-a">
                    <Item :form="item.form!" :model="model" render-str="a-str-item" />
                </div>
                <br />
            </template>
        </CommForm>
    </ACard>
    <AButton @click="tes">1</AButton>
</template>

<script setup lang="ts">
import type { FormType } from '@/components/CommForm/types'
import Item from '@/components/CommForm/Item/index.vue'

const testForm = ref<Array<FormType>>([
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
        form: [
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

<style lang="scss" scoped>
.temp-a {
    display: flex;
    .a-form-item {
        width: 49%;
    }
}
</style>
