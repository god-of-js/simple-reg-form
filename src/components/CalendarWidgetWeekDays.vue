<script setup lang="ts">
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
</script>

<template>
  <ul class="grid-7 grid">
    <li v-for="(weekday, index) in weekdays" :key="index" class="p-1 text-center text-3 dark:text-gray-900">
      {{ weekday }}
    </li>
  </ul>
</template>

<style scoped>
.grid-7 {
  grid-template-columns: repeat(7, 1fr);
}
</style>
