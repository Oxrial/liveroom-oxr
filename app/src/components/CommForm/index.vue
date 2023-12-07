<template>
    <AForm>
        <Item :forms="form" :modal="modal" @update-slots="updateSlots">
            <template v-for="slot in slots" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="(scope as SlotScope)"></slot>
            </template>
        </Item>
    </AForm>
</template>

<script setup lang="ts">
import Item from './Item/index.vue'
import type { FormProps, SlotScope } from './types'
withDefaults(defineProps<FormProps>(), {})
const slots = ref<Array<string>>([])
// const slots = computed(() => itemRef.value && itemRef.value.slots)

const updateSlots = (slot: string) => !(slot in slots.value) && slots.value.push(slot)
</script>

<style lang="scss" scoped></style>
