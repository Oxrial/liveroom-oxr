<template>
    <AForm>
        <Item :forms="form" :modal="modal" ref="itemRef">
            <template v-for="(obj, slot) in slots" v-slot:[slot]>
                <slot :name="slot" v-bind="(obj as object)"></slot>
            </template>
        </Item>
    </AForm>
</template>

<script setup lang="ts">
import Item from './Item/index.vue'
import type { FormProps } from './types'
withDefaults(defineProps<FormProps>(), {})
const itemRef = ref<{ $slots: object }>()
const slots = computed(() => itemRef.value && itemRef.value.$slots)
</script>

<style lang="scss" scoped></style>
