<script setup lang="ts">
interface Props {
  label?: string
  error?: string
  name: string
  suggestion?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="w-full text-left">
    <label v-if="props.label" :for="props.name" class="text-left text-3">{{ props.label }}</label>
    <slot />
    <div v-if="props.error" class="error-text text-left text-3 text-red">
      {{ props.error }}
    </div>
    <div v-if="props.suggestion" class="text-left text-3">
      {{ props.suggestion }}
    </div>
  </div>
</template>
