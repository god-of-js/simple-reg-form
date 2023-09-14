<script setup lang="ts">
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import CalenderWidgetDayItem from './CalendarWidgetDayItem.vue'
import CalenderWidgetMonthNavigator from './CalendarWidgetMonthNavigator.vue'
import CalendarWidgetWeekDays from './CalendarWidgetWeekDays.vue'

interface Props {
  modelValue: Dayjs
  data?: { date: string | Dayjs; name: string; [key: string]: unknown }[]
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: Dayjs): void
  (e: 'triggerWithDateClicked', val: Dayjs): void
}>()
dayjs.extend(weekday)
dayjs.extend(weekOfYear)

const today = dayjs().format('YYYY-MM-DD')

const activeMonthDayReference = ref(props.modelValue)
const activeDate = computed(() => {
  return activeMonthDayReference.value || dayjs()
})

const yearOfActiveDate = computed(() => {
  return dayjs(activeDate.value).year()
})

const monthOfActiveDate = computed(() => {
  return dayjs(activeDate.value).month() + 1
})

const numberOfDaysInSelectedMonth = computed(() => {
  return dayjs(props.modelValue).daysInMonth()
})

const daysInSelectedMonth = computed(() => {
  return [...Array(numberOfDaysInSelectedMonth.value)].map((_, index) => {
    return {
      date: dayjs(`${yearOfActiveDate.value}-${monthOfActiveDate.value}-${index + 1}`),
      isCurrentMonth: true,
    }
  })
})

const visibleDaysInPreviousMonth = computed(() => {
  const firstDayOfTheMonthWeekday = getWeekday(daysInSelectedMonth.value[0].date)
  const previousMonth = dayjs(`${yearOfActiveDate.value}-${monthOfActiveDate.value}-01`).subtract(
    1,
    'month',
  )

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6

  const previousMonthLastMondayDayOfMonth = dayjs(daysInSelectedMonth.value[0].date)
    .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
    .date()

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
    return {
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`,
      ),
      isCurrentMonth: false,
    }
  })
})

const visibleDaysInNextMonth = computed(() => {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${yearOfActiveDate.value}-${monthOfActiveDate.value}-${daysInSelectedMonth.value.length}`,
  )
  const nextMonth = dayjs(`${yearOfActiveDate.value}-${monthOfActiveDate.value}-01`).add(1, 'month')
  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => {
    return {
      date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`),
      isCurrentMonth: false,
    }
  })
})

const visibleDays = computed(() => [
  ...visibleDaysInPreviousMonth.value,
  ...daysInSelectedMonth.value,
  ...visibleDaysInNextMonth.value,
])

function selectMonth(date: Dayjs) {
  activeMonthDayReference.value = date
}

function getWeekday(date: Dayjs | string) {
  return dayjs(date).weekday()
}

function selectDay(e: Dayjs) {
  emit('update:modelValue', e)
}
</script>

<template>
  <div class="calendar">
    <CalenderWidgetMonthNavigator :selected-date="activeMonthDayReference" @select-month="selectMonth" />
    <CalendarWidgetWeekDays />
    <ol class="grid-7 grid">
      <CalenderWidgetDayItem
        v-for="(day, index) in visibleDays"
        :key="index"
        :is-today="day.date.format('YYYY-MM-DD') === today"
        :day="day.date"
        :is-current-month="day.isCurrentMonth"
        @date-clicked="selectDay"
      />
    </ol>
  </div>
</template>

<style scoped>
.grid-7 {
  grid-template-columns: repeat(7, 1fr);
}
</style>
