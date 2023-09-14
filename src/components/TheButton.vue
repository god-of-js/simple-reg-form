<script setup lang="ts">
interface Props {
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'submit',
})
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="flex items-center gap-4 rounded px-4 py-3 app-border" :type="props.type" :disabled="props.disabled" @click="emit('click')">
    <span v-if="props.loading">Loading...</span>
    <slot v-else />
  </button>
</template>

<style scoped>

</style>
