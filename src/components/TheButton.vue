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
  <button class="rounded px-4 py-3" :disabled="props.disabled" border="~ rounded gray-200 dark:gray-700" @click="emit('click')">
    <span v-if="props.loading">Loading...</span>
    <slot v-else />
  </button>
</template>

<style scoped>

</style>
