<template>
    <AForm :model="model">
        <Item :forms="form" :model="model" @update-slots="updateSlots">
            <template v-for="slot in slots" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="(scope as SlotScope)" />
            </template>
        </Item>
    </AForm>
</template>

<script setup lang="ts">
import Item from './Item/index.vue'
import type { FormProps, SlotScope } from './types'
withDefaults(defineProps<FormProps>(), {})
const slots = ref<Array<string>>([])
const updateSlots = (slot: string) => !slots.value.includes(slot) && slots.value.push(slot)
</script>

<style lang="scss" scoped></style>
