<script setup>
defineProps({
  symbol: { type: String, default: '✦' },
})
</script>

<template>
  <div
    class="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-violet-300"
  >
    <span>{{ symbol }}</span>
    <span><slot /></span>
    <span>{{ symbol }}</span>
  </div>
</template>
