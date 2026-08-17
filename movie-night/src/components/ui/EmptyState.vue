<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 py-16 px-6 text-center">
    <h3 className="text-white font-semibold text-lg">{{ title }}</h3>
    <p v-if="subtitle" className="text-slate-400 text-sm">{{ subtitle }}</p>
    <div className="mt-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
</style>
