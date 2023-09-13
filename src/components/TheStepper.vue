<script setup lang="ts">
interface Props {
  steps: string[]
  activeStep: string
}
const props = defineProps<Props>()

const activeIndex = computed(() => {
  const indexOfCurrentStep = props.steps.findIndex(step => step === props.activeStep)

  return indexOfCurrentStep
})
</script>

<template>
  <div class="w-fit flex gap-2">
    <div v-for="(_, index) in props.steps" :key="index" class="flex items-center gap-2">
      <div :class="`h-3 w-3 rounded-full ${index <= activeIndex ? 'bg-blue' : 'dark:bg-gray-700 bg-gray-200'}`" />
      <div v-if="index !== props.steps.length - 1" :class="`h-0.5 w-12 ${index <= activeIndex ? 'bg-blue' : 'dark:bg-gray-700 bg-gray-200'}`" />
    </div>
  </div>
</template>

<style scoped>

</style>
