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
  delay(10).then(() => {
    emit('goToNext')
  })
}
</script>

<template>
  <div class="flex flex-col gap-8 text-center md:text-left">
    <header>
      <h1 class="font-poppins mb-4 text-8 font-bold leading-[50px]">
        Profile Info
      </h1>
      <p class="text-4 font-thin text-gray-400">
        Fill in the data for profile. It will take a couple of minutes. You only need a passport
      </p>
    </header>
    <TheForm :form-data="data" :rules="formRules" @form-submit="goNext">
      <template #default="{ formErrors }">
        <div>
          <div class="app-border grid mb-8 gap-8 rounded-lg pa-6">
            <div>
              <h2 class="font-poppins text-5 font-600 text-gray-900">
                Personal data
              </h2>
              <p class="text-3 font-thin text-gray-400">
                Specify exactly as passport
              </p>
            </div>
            <TheInput v-model="data.email" label="First Name" :error="formErrors.email" name="email" />
            <TheInput v-model="data.password" label="Last Name" :error="formErrors.password" type="password" name="password" />
            <div class="">
              loreemm
            </div>
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
