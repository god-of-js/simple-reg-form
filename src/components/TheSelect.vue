<script setup lang="ts">
interface Option {
  label: string
  value: string
}
interface Props {
  modelValue: string
  error?: string
  name: string
  label?: string
  options: Option[]
  disabled?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{ (e: 'update:model-value', val: string): void }>()

const optionsAreVisible = ref(false)
const searchQuery = ref('')

const selectedOption = computed(() => {
  if (!props.modelValue)
    return
  return props.options.find(({ value }) => value === props.modelValue)
})

const filteredOptions = computed(() => {
  if (!searchQuery.value)
    return props.options

  const query = searchQuery.value.toLowerCase().trim()
  return props.options.filter((option) => {
    return option.label.toLowerCase().includes(query)
  })
})

function sendSelection(e: string) {
  if (props.disabled)
    return
  optionsAreVisible.value = false
  emit('update:model-value', e)
}

function toggleOptions() {
  optionsAreVisible.value = !optionsAreVisible.value

  if (!optionsAreVisible.value) {
    searchQuery.value = ''
    return
  }
  nextTick(() => {
    const inputElement = document.querySelector('#search-input') as HTMLInputElement | null
    inputElement?.focus()
  })
}
</script>

<template>
  <TheField :error="props.error" :label="props.label" :name="props.name" class="relative">
    <TheButton
      type="button"
      class="w-full justify-between rounded-none"
      bordered-only-on-bottom
      no-border-radius
      @click="toggleOptions"
    >
      <input
        v-if="optionsAreVisible"
        id="search-input"
        v-model="searchQuery"
        class="border-transparent bg-transparent outline-none"
        placeholder="Search Options"
        @click.stop
        @keydown.space.prevent
      >
      <span v-else>{{ selectedOption ? selectedOption.label : 'Select an option' }}</span>
      <div v-if="optionsAreVisible" i-carbon-caret-up />
      <div v-else i-carbon-caret-down />
    </TheButton>
    <transition>
      <ul v-if="optionsAreVisible" class="absolute z-1 w-full bg-white shadow">
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="cursor-pointer pa-2 hover:bg-gray-300 dark:text-gray-900"
          @click="sendSelection(option.value)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </TheField>
</template>

<style scoped>
.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
  margin-top: 0;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  margin-top: -1rem;
}
</style>
