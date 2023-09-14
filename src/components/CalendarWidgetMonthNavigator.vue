<script setup lang="ts">
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

interface Props {
  selectedDate: Dayjs
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'selectDate', val: Dayjs): void
}>()
const selectedMonth = computed(() => {
  return props.selectedDate.format('MMMM YYYY')
})

function goToPrevMonth() {
  const newSelectedDate = dayjs(props.selectedDate).subtract(1, 'month')
  emit('selectDate', newSelectedDate)
}

function goToNextMonth() {
  const newSelectedDate = dayjs(props.selectedDate).add(1, 'month')
  emit('selectDate', newSelectedDate)
}
</script>

<template>
  <div class="align-center flex justify-center gap-8 pa-4">
    <button class="icon-btn" @click="goToPrevMonth">
      <div i-carbon-arrow-left />
    </button>
    <span class="month-details">{{ selectedMonth }}</span>
    <button class="icon-btn" @click="goToNextMonth">
      <div i-carbon-arrow-right />
    </button>
  </div>
</template>
