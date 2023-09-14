<script setup lang="ts">
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { computed } from 'vue'

interface Props {
  isCurrentMonth: boolean
  isToday: boolean
  day: Dayjs
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'dateClicked', day: Dayjs): void
}>()

const label = computed(() => {
  return dayjs(props.day).format('D')
})

function pickDate() {
  if (!props.isCurrentMonth)
    return

  emit('dateClicked', props.day)
}
</script>

<template>
  <li
    class="day-item cursor-pointer p-1 py-2 text-center text-3" :class="{
      'text-gray-300 cursor-not-allowed': !props.isCurrentMonth,
      'is-today text-blue': props.isToday,
    }"
    @click="pickDate"
  >
    {{ label }}
  </li>
</template>
