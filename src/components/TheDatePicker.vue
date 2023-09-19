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
const calendarRef = ref<HTMLElement>()
const calendarValue = computed({
  set(e: Dayjs) {
    emit('update:model-value', e)
  },
  get() {
    return props.modelValue
  },
})

const displayValue = computed(() => {
  return props.modelValue.format('YYYY-MM-DD') || 'Select Date'
})

function hideCalendar() {
  calendarIsVisible.value = false
}
watch(() => calendarValue.value, hideCalendar)
onClickOutside(calendarRef, hideCalendar)
</script>

<template>
  <TheField ref="calendarRef" :error="props.error" :label="props.label" :name="props.name" class="relative">
    <TheButton type="button" class="w-full justify-between" bordered-only-on-bottom no-border-radius @click="calendarIsVisible = !calendarIsVisible">
      {{ displayValue }} <div v-if="calendarIsVisible" i-carbon-caret-up /><div v-else i-carbon-caret-down />
    </TheButton>
    <transition>
      <div v-if="calendarIsVisible" class="absolute z-1 bg-white shadow">
        <CalendarWidget v-model="calendarValue" />
      </div>
    </transition>
  </TheField>
</template>

<style scoped>
.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
  margin-top: 0;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  margin-top: -1rem;
}
</style>
