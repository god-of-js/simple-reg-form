<script setup lang="ts">
const weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
</script>

<template>
  <ul class="grid-7 grid">
    <li v-for="(weekday, index) in weekdays" :key="index" class="text-4">
      {{ weekday }}
    </li>
  </ul>
</template>

<style scoped>
.grid-7 {
  grid-template-columns: repeat(7, 1fr);
}
</style>
