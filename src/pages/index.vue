<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div class="mx-auto w-90% md:w-70%">
    <div class="flex items-center gap-2 md:fixed">
      <div i-carbon-campsite text-xl />
      <span>PROJECT</span>
    </div>

    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <TheButton @click="go">
        Send Code
      </TheButton>
    </div>
  </div>
</template>
