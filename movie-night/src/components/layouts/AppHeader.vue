<script setup>
import AppButton from '../ui/AppButton.vue'

defineProps({
  currentView: { type: String, default: 'films' },
  favoriteCount: { type: Number, default: 0 },
})
const emit = defineEmits(['navigate'])
</script>

<template>
  <header class="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-pink-700 flex items-center justify-center font-bold text-white">
        M
      </div>
      <h1 class="text-lg font-bold tracking-wide text-white">MOVIE NIGHT</h1>
    </div>

    <nav class="flex items-center gap-4 flex-wrap">
      <AppButton :active="currentView === 'films'" @click="emit('navigate', 'films')">Films</AppButton>
      <AppButton :active="currentView === 'favorites'" @click="emit('navigate', 'favorites')">Favoris {{ favoriteCount }}</AppButton>
    </nav>
  </header>
</template>

<style scoped>
</style>