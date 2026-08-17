<script setup>
import AppButton from '../ui/AppButton.vue'

defineProps({
  movie: { type: Object, required: true },
})
defineEmits(['toggle-favorite', 'view-details'])
</script>

<template>
    <div className="bg-slate-900 rounded-xl overflow-hidden flex flex-col border border-slate-800 hover:border-slate-600 transition-colors h-[480px]">
        <div className="relative flex-[2] min-h-0">
            <img :src="movie.image" :alt="movie.title" className="w-full h-full object-cover" />
            <button
              type="button"
              @click="$emit('toggle-favorite', movie.id)"
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-950/70 flex items-center justify-center"
            >
                <span :className="movie.favorite ? 'text-pink-600' : 'text-white'">{{ movie.favorite ? '♥' : '♡' }}</span>
            </button>
        </div>
        <div className="flex-1 min-h-0 flex flex-col gap-1 p-3">
            <div className="text-white font-semibold">{{ movie.title }}</div>
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <span>★ {{ movie.rating }}</span>
                <span>{{ movie.year }}</span>
            </div>
            <div className="text-slate-500 text-xs">{{ movie.category }}</div>
            <AppButton class="mt-auto w-full" @click="$emit('view-details', movie)">Voir le détail</AppButton>
        </div>
    </div>
</template>

<style scoped>
</style>
