<script setup>
import SectionHeading from '../ui/SectionHeading.vue'
import EmptyState from '../ui/EmptyState.vue'
import AppButton from '../ui/AppButton.vue'
import MovieCard from '../cards/MovieCard.vue'

defineProps({
  movies: { type: Array, required: true },
})
const emit = defineEmits(['toggle-favorite', 'view-details', 'navigate'])
</script>

<template>
    <section className="px-6 py-12">
        <SectionHeading
          title="Mes films favoris"
          subtitle="Retrouvez ici les films que vous avez ajoutés à vos favoris."
        />

        <EmptyState
          v-if="movies.length === 0"
          title="Aucun favori pour le moment"
          subtitle="Ajoutez des films depuis la vue Films pour les retrouver ici."
        >
            <AppButton active @click="emit('navigate', 'films')">Découvrir les films</AppButton>
        </EmptyState>

        <div v-else className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MovieCard
              v-for="movie in movies"
              :key="movie.id"
              :movie="movie"
              @toggle-favorite="emit('toggle-favorite', $event)"
              @view-details="emit('view-details', $event)"
            />
        </div>
    </section>
</template>

<style scoped>
</style>
