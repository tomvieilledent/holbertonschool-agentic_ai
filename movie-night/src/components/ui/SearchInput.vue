<script setup>
defineProps({
  placeholder: { type: String, default: 'Rechercher...' },
})
const model = defineModel({ default: '' })
</script>

<template>
  <input
    type="text"
    v-model="model"
    :placeholder="placeholder"
    className="flex-1 bg-slate-900 text-white placeholder-slate-500 rounded-xl border border-slate-700 px-4 py-2"
  />
</template>

<style scoped>
</style>
