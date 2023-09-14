<script setup lang="ts">
import { required } from '@vuelidate/validators'
import dayjs from 'dayjs'

import TheDatePicker from '../TheDatePicker.vue'
import useDelay from '~/composables/useDelay'

const emit = defineEmits<{ (e: 'goToNext'): void }>()
const { delay, loading } = useDelay()
const data = ref({
  email: '',
  password: '',
  dateOfBirth: dayjs(),
  placeOfBirth: '',
})
const formRules = {
  firstName: [required],
  secondName: [required],
  dateOfBirth: [required],
  placeOfBirth: [required],
}
const locationOptions = [
  {
    label: 'United States',
    value: 'usa',
  },
  {
    label: 'United Kingdom',
    value: 'uk',
  },
  {
    label: 'Germany',
    value: 'de',
  },
  {
    label: 'Russia',
    value: 'ru',
  },
  {
    label: 'Nigeria',
    value: 'ng',
  },
  {
    label: 'South Africa',
    value: 'sa',
  },
]
function goNext() {
  delay(10).then(() => {
    emit('goToNext')
  })
}
</script>

<template>
  <div class="flex flex-col gap-8 text-center md:text-left">
    <header>
      <h1 class="mb-4 font-poppins text-8 font-bold leading-[50px]">
        Profile Info
      </h1>
      <p class="text-4 font-thin text-gray-400">
        Fill in the data for profile. It will take a couple of minutes. You only need a passport
      </p>
    </header>
    <TheForm :form-data="data" :rules="formRules" @form-submit="goNext">
      <template #default="{ formErrors }">
        <div>
          <div class="grid mb-8 gap-8 rounded-lg pa-6 app-border">
            <div>
              <h2 class="font-poppins text-5 font-600 text-gray-900">
                Personal data
              </h2>
              <p class="text-3 font-thin text-gray-400">
                Specify exactly as passport
              </p>
            </div>
            <TheInput v-model="data.email" label="First Name" :error="formErrors.firstName" name="email" />
            <TheInput v-model="data.password" label="Last Name" :error="formErrors.lastName" type="password" name="password" />
            <div class="grid-2 grid gap-4">
              <TheDatePicker v-model="data.dateOfBirth" :error="formErrors.dateOfBirth" label="Date of Birth" name="dateOfBirth" />
              <TheSelect v-model="data.placeOfBirth" :options="locationOptions" name="placeOfBirth" label="Place of Birth" />
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
.grid-2 {
  grid-template-columns: repeat(2, 1fr)
}
</style>
