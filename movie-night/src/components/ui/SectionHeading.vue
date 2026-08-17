<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div className="mb-8">
    <h2 v-if="eyebrow" className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-3">{{ eyebrow }}</h2>
    <h1 className="text-5xl text-white font-extrabold mb-3">{{ title }}</h1>
    <p v-if="subtitle" className="text-slate-400">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
</style>
