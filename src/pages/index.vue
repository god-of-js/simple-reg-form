<script setup lang="ts" generic="T extends any, O extends any">
import ContactsForm from '~/components/steps/ContactsForm.vue'
import RegistrationForm from '~/components/steps/RegistrationForm.vue'
import ProfileInfoForm from '~/components/steps/ProfileInfoForm.vue'

defineOptions({
  name: 'IndexPage',
})

const steps = {
  RegistrationForm,
  ProfileInfoForm,
  ContactsForm,
}

type StepKeys = keyof typeof steps
const stepKeys = Object.keys(steps) as StepKeys[]
const activeStep = ref<StepKeys>(stepKeys[1])

function goNext() {
  const indexOfActiveStep = stepKeys.findIndex(step => activeStep.value === step)

  if (indexOfActiveStep < stepKeys.length - 1)
    activeStep.value = stepKeys[indexOfActiveStep + 1]
  // eslint-disable-next-line no-alert
  else alert('Forms completed') // Ignore the alert and the disabled eslint rule. I need it for only this line.
}
</script>

<template>
  <div class="mx-auto mb-20 md:w-65%">
    <div class="flex items-center gap-2 md:fixed">
      <div i-carbon-campsite text-xl />
      <span>PROJECT X</span>
    </div>
    <div class="mx-auto lg:w-50% md:w-70%">
      <TheStepper :steps="stepKeys" :active-step="activeStep" class="mx-auto md:mx-0" />

      <div class="my-20">
        <KeepAlive>
          <Component :is="steps[activeStep]" @go-to-next="goNext" />
        </KeepAlive>
      </div>
    </div>
  </div>
</template>
