<script setup>
import { ref, onMounted } from 'vue'
import InsightCard from '../cards/InsightCard.vue'
import SectionBadge from '../ui/SectionBadge.vue'
import SectionTitle from '../ui/SectionTitle.vue'
import { getInsights } from '../../services/insightsService'

/* State: the insights list and a possible error message. */
const insights = ref([])
const error = ref(null)

/* Load the insights once, when the component is mounted. */
onMounted(async () => {
  try {
    insights.value = await getInsights()
  } catch {
    error.value = 'Unable to load insights. Please try again later.'
  }
})
</script>

<template>
  <section id="insights-section" class="relative bg-black py-24">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
      <!-- Badge -->
      <SectionBadge symbol="✧" class="text-xs"> Insights </SectionBadge>

      <!-- Title -->
      <div>
        <SectionTitle
          class="text-4xl md:text-5xl"
          top="Explore Agentic AI"
          bottom="Through real-world scenes"
        />
      </div>

      <!-- Error message area -->
      <p v-if="error" class="text-sm text-red-400">
        {{ error }}
      </p>

      <!-- Insights grid -->
      <div v-else class="mt-12 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <InsightCard
          v-for="(insight, index) in insights"
          :key="insight.title"
          :index="index"
          :image="insight.image"
          :title="insight.title"
          :description="insight.description"
          :category="insight.category"
        />
      </div>
    </div>
  </section>
</template>
