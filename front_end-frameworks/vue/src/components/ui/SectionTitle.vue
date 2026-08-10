<script setup>
defineProps({
  top: { type: String, required: true },
  bottom: { type: String, required: true },
  as: { type: String, default: 'h2' },
})
</script>

<template>
  <component :is="as" class="leading-none font-black tracking-tight">
    <span class="block text-slate-50">{{ top }}</span>
    <span class="block text-violet-300">{{ bottom }}</span>
  </component>
</template>
