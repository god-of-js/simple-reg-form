<template>
  <div class="font-poppins flex items-start justify-between gap-4 rounded bg-gray-100 pa-4 text-left text-3 dark:bg-gray-600">
    <span id="prepend-slot">

      <slot name="prepend" />
    </span>
    <span id="default-slot">
      <slot />
    </span>
    <button icon-btn class="text-lg icon-btn">
      <div i-carbon-close />
    </button>
  </div>
</template>
