<script setup lang="ts">
import type { Dayjs } from 'dayjs'

interface Props {
  modelValue: Dayjs
  error?: string
  name: string
  label?: string
}
const props = defineProps<Props>()

const emit = defineEmits<{ (e: 'update:model-value', val: Dayjs): void }>()

const calendarIsVisible = ref(false)
const calendarValue = computed({
  set(e: Dayjs) {
    emit('update:model-value', e)
  },
  get() {
    return props.modelValue
  },
})

watch(() => calendarValue.value, () => {
  calendarIsVisible.value = false
})

const displayValue = computed(() => {
  return props.modelValue.format('YYYY-MM-DD')
})
</script>

<template>
  <TheField :error="props.error" :label="props.label" :name="props.name" class="relative">
    <TheButton type="button" class="w-full justify-between" bordered-only-on-bottom no-border-radius @click="calendarIsVisible = !calendarIsVisible">
      {{ displayValue }} <div v-if="calendarIsVisible" i-carbon-caret-up /><div v-else i-carbon-caret-down />
    </TheButton>
    <div v-if="calendarIsVisible" class="absolute z-1 bg-white shadow">
      <CalendarWidget v-model="calendarValue" />
    </div>
  </TheField>
</template>

<style scoped>
.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
}
</style>
