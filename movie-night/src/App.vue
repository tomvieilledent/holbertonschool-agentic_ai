<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/layouts/AppHeader.vue'
import AppFooter from './components/layouts/AppFooter.vue'
import Films from './components/sections/Films.vue'
import Favorites from './components/sections/Favorites.vue'

const categories = ['Tous', 'Action', 'Comédie', 'Science-fiction', 'Animation']

const movies = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const search = ref('')
const selectedCategory = ref('Tous')
const currentView = ref('films')

async function loadMovies() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await fetch('/data/movies.json')
    if (!response.ok) {
      throw new Error('Réponse invalide du serveur.')
    }
    movies.value = await response.json()
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue pendant le chargement.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadMovies)

const filteredMovies = computed(() => {
  return movies.value.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'Tous' || movie.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const favoriteMovies = computed(() => movies.value.filter((movie) => movie.favorite))
const favoriteCount = computed(() => favoriteMovies.value.length)

function toggleFavorite(id) {
  const movie = movies.value.find((m) => m.id === id)
  if (movie) {
    movie.favorite = !movie.favorite
  }
}

function handleNavigate(view) {
  currentView.value = view
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950">
    <AppHeader :current-view="currentView" :favorite-count="favoriteCount" @navigate="handleNavigate" />

    <main class="flex-1">
      <Films
        v-if="currentView === 'films'"
        v-model:search="search"
        v-model:selectedCategory="selectedCategory"
        :movies="filteredMovies"
        :categories="categories"
        :is-loading="isLoading"
        :error-message="errorMessage"
        @toggle-favorite="toggleFavorite"
        @retry="loadMovies"
      />
      <Favorites
        v-else
        :movies="favoriteMovies"
        @toggle-favorite="toggleFavorite"
        @navigate="handleNavigate"
      />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
</style>
