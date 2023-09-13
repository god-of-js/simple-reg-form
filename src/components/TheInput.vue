<script setup lang="ts">
interface Props {
  type?: 'text' | 'password' | 'tel'
  error?: string
  modelValue: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})
const emit = defineEmits<{
  (e: 'update:modelValue', p: string): void
}>()

const inputValue = computed({
  set(val: string) {
    emit('update:modelValue', val)
  },
  get() {
    return props.modelValue
  },
})
</script>

<template>
  <input
    id="input"
    v-model="inputValue"
    :type="props.type"
    v-bind="$attrs"
    class="w-full b-0 b-b-1 b-gray-200 text-left dark:b-gray-700" :class="[{ 'b-red': !!props.error }]"
    p="x-4 y-2"
    bg="transparent"
    outline="none active:none"
  >
</template>
