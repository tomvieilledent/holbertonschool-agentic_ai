<script setup>
defineProps({
  href: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: [Object, Function], required: true },
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="label"
    class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-violet-500 hover:text-violet-300"
  >
    <component :is="icon" :size="16" />
  </a>
</template>
