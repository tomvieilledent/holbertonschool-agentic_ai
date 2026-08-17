<script setup>
import SectionHeading from '../ui/SectionHeading.vue'
import SearchInput from '../ui/SearchInput.vue'
import CategoryFilters from '../ui/CategoryFilters.vue'
import Spinner from '../ui/Spinner.vue'
import EmptyState from '../ui/EmptyState.vue'
import AppButton from '../ui/AppButton.vue'
import MovieCard from '../cards/MovieCard.vue'

defineProps({
  movies: { type: Array, required: true },
  categories: { type: Array, required: true },
  isLoading: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
})
const emit = defineEmits(['toggle-favorite', 'view-details', 'retry'])

const search = defineModel('search', { default: '' })
const selectedCategory = defineModel('selectedCategory', { default: 'Tous' })

function resetFilters() {
  search.value = ''
  selectedCategory.value = 'Tous'
}
</script>

<template>
    <section className="px-6 py-12">
        <SectionHeading
          eyebrow="Votre soirée commence ici"
          title="Quel film pour ce soir ?"
          subtitle="Recherchez un titre, filtrez par catégorie et gardez vos favoris."
        />

        <div className="flex flex-wrap gap-4 mb-8">
            <SearchInput v-model="search" placeholder="Rechercher un film..." />
            <CategoryFilters v-model="selectedCategory" :categories="categories" />
        </div>

        <Spinner v-if="isLoading">
            <p className="text-white font-semibold">Chargement des films...</p>
            <p className="text-slate-500 text-sm">Préparation de votre sélection</p>
        </Spinner>

        <EmptyState v-else-if="errorMessage" title="Impossible de charger les films" :subtitle="errorMessage">
            <AppButton active @click="emit('retry')">Réessayer</AppButton>
        </EmptyState>

        <EmptyState
          v-else-if="movies.length === 0"
          title="Aucun film trouvé"
          subtitle="Essayez une autre recherche ou réinitialisez vos filtres."
        >
            <AppButton active @click="resetFilters">Réinitialiser les filtres</AppButton>
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
