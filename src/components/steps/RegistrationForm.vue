<script setup lang="ts">
import { email, minLength, required } from '@vuelidate/validators'

import useDelay from '~/composables/useDelay'

const emit = defineEmits<{ (e: 'goToNext'): void }>()
const { delay, loading } = useDelay()
const data = ref({
  email: '',
  password: '',
})
const formRules = {
  email: [required, email],
  password: [required, minLength(32)],
}
function goNext() {
  delay(1).then(() => {
    emit('goToNext')
  })
}
</script>

<template>
  <div class="flex flex-col gap-8 text-center md:text-left">
    <header>
      <h1 class="mb-4 font-poppins text-8 font-bold leading-[50px]">
        Registration
      </h1>
      <p class="text-4 font-thin text-gray-400">
        Fill in the registration data. It will take a couple of minutes.
        All you need is an email and password.
      </p>
    </header>
    <TheAlert>
      <template #prepend>
        <div i-carbon-locked class="text-6" />
      </template>
      We take privacy issues seriously. You can be sure that your personal data is securely protected.
    </TheAlert>
    <TheForm :form-data="data" :rules="formRules" @form-submit="goNext">
      <template #default="{ formErrors }">
        <div>
          <div class="grid mb-8 gap-8 rounded-lg pa-8 app-border">
            <TheInput v-model="data.email" label="Please enter your email" :error="formErrors.email" name="email" />
            <TheInput v-model="data.password" label="Please enter your password" :error="formErrors.password" type="password" name="password" />
          </div>
          <TheButton class="w-fit" :loading="loading">
            Go Next <span i-carbon-arrow-right />
          </TheButton>
        </div>
      </template>
    </TheForm>
  </div>
</template>

<style scoped>

</style>
