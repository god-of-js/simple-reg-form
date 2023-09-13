<script setup lang="ts" generic="T extends any, O extends any">
import LocationInfoForm from '~/components/steps/LocationInfoForm.vue'
import RegistrationForm from '~/components/steps/RegistrationForm.vue'
import ProfileInfoForm from '~/components/steps/ProfileInfoForm.vue'

defineOptions({
  name: 'IndexPage',
})

const steps = {
  RegistrationForm,
  LocationInfoForm,
  ProfileInfoForm,
}

type StepKeys = keyof typeof steps
const stepKeys = Object.keys(steps) as StepKeys[]
const activeStep = ref<StepKeys>(stepKeys[0])
</script>

<template>
  <div class="mx-auto mb-20 md:w-70%">
    <div class="flex items-center gap-2 md:fixed">
      <div i-carbon-campsite text-xl />
      <span>PROJECT X</span>
    </div>
    <div class="mx-auto lg:w-50% md:w-70%">
      <TheStepper :steps="stepKeys" :active-step="activeStep" class="mx-auto md:mx-0" />

      <div class="my-20">
        <KeepAlive>
          <Component :is="steps[activeStep]" />
        </KeepAlive>
      </div>
    </div>
  </div>
</template>
