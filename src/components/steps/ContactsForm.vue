<script setup lang="ts">
import useDelay from '~/composables/useDelay'

const emit = defineEmits<{ (e: 'goToNext'): void }>()
const { delay, loading } = useDelay()
const data = ref({
  phone: '',
})
function goNext() {
  delay(2).then(() => {
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
    <TheForm :form-data="data" @form-submit="goNext">
      <template #default="{ formErrors }">
        <div>
          <div class="grid mb-8 gap-8 rounded-lg pa-6 app-border">
            <div>
              <h2 class="font-poppins text-5 font-600 text-gray-900">
                Contact
              </h2>
              <p class="text-3 font-thin text-gray-400">
                These contacts are used to inform about orders
              </p>
            </div>
            <TheInput v-model="data.phone" label="Phone" :error="formErrors.phone" name="firstName" />
          </div>
          <TheButton class="mx-auto w-fit md:m-0" :loading="loading">
            Finish
          </TheButton>
        </div>
      </template>
    </TheForm>
  </div>
</template>

<style scoped>
@media screen and (min-width: 600px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr)
  }
}
</style>
