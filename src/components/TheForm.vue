<script lang="ts" setup>
import { computed } from 'vue'
import type { ValidationArgs } from '@vuelidate/core'
import useVuelidate from '@vuelidate/core'

interface Props {
  rules?: ValidationArgs
  formData: Record<string, unknown>
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  rules: () => ({}),
})

const emit = defineEmits<{
  (e: 'formSubmit', p: typeof props.formData): void
}>()

const v$ = useVuelidate<typeof props.formData>(props.rules, props.formData, {
  $autoDirty: true,
})

function validateAndSubmit() {
  if (props.disabled)
    return
  v$.value.$validate()
  if (!v$.value.$error)
    emit('formSubmit', props.formData)
}

const formErrors = computed(() => {
  const errorList: Record<string, string> = {}
  v$.value.$errors.forEach((err) => {
    errorList[err.$propertyPath] = typeof err.$message === 'string' ? err.$message : err.$message.value
  })
  return errorList
})
</script>

<template>
  <form @submit.prevent="validateAndSubmit">
    <slot
      :form-errors="formErrors"
      :form-submit="validateAndSubmit"
      :has-errors="v$.$error"
      :is-dirty="v$.$dirty"
    />
  </form>
</template>
