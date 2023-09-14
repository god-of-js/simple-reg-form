<script setup lang="ts">
interface Option {
  label: string
  value: string
}
interface Props {
  modelValue: string
  error?: string
  name: string
  label?: string
  options: Option[]
  disabled?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{ (e: 'update:model-value', val: string): void }>()

const optionsAreVisible = ref(false)

const selectedOption = computed(() => {
  if (!props.modelValue)
    return
  return props.options.find(({ value }) => value === props.modelValue)
})

function sendSelection(e: string) {
  if (props.disabled)
    return
  optionsAreVisible.value = false
  emit('update:model-value', e)
}
</script>

<template>
  <TheField :error="props.error" :label="props.label" :name="props.name" class="relative">
    <TheButton type="button" class="w-full justify-between b-l-0 b-r-0 b-t-0 rounded-none" @click="optionsAreVisible = !optionsAreVisible">
      {{ selectedOption ? selectedOption.label : 'Select an option' }}
      <div v-if="optionsAreVisible" i-carbon-caret-up />
      <div v-else i-carbon-caret-down />
    </TheButton>
    <ul v-if="optionsAreVisible" class="absolute z-1 w-full bg-white">
      <li v-for="(option, index) in props.options" :key="index" class="cursor-pointer pa-2 hover:bg-gray-300" @click="sendSelection(option.value)">
        {{ option.label }}
      </li>
    </ul>
  </TheField>
</template>

<style scoped>

</style>
