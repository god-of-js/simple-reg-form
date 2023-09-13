<script setup lang="ts">
interface Props {
  loading?: boolean
  disabled?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="app-border flex items-center gap-4 rounded px-4 py-3" :disabled="props.disabled" @click="emit('click')">
    <span v-if="props.loading">Loading...</span>
    <slot v-else />
  </button>
</template>

<style scoped>

</style>
