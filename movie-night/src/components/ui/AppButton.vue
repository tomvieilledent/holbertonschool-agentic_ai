<script setup>
defineProps({
  active: { type: Boolean, default: false },
})
</script>

<template>
  <button
    class="text-white px-4 py-2 text-sm font-medium rounded-full transition-colors border border-slate-600"
    :class="active ? 'bg-pink-700' : 'bg-slate-800 hover:bg-slate-700'"
  >
    <slot />
  </button>
</template>

<style scoped>
</style>
