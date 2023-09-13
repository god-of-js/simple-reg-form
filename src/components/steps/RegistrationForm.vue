<script setup lang="ts">
import { required } from '@vuelidate/validators'

const data = ref({
  email: '',
})
const formRules = {
  email: [required],
}
function goNext() {}
</script>

<template>
  <div class="flex flex-col gap-8 text-center md:text-left">
    <header>
      <h1 class="font-poppins mb-4 text-8 font-bold leading-[50px]">
        Registration
      </h1>
      <p class="text-4 font-thin text-gray-700 dark:text-gray-400">
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
          <div class="app-border mb-8 rounded-lg pa-6">
            <TheInput v-model="data.email" :error="formErrors.email" name="email" />
          </div>
          <TheButton class="w-fit">
            Go Next <span i-carbon-arrow-right />
          </TheButton>
        </div>
      </template>
    </TheForm>
  </div>
</template>

<style scoped>

</style>
