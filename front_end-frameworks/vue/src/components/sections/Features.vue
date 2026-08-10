<script setup>
import features from '../../data/features'
import FeatureCard from '../cards/FeatureCard.vue'
import SectionBadge from '../ui/SectionBadge.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>

<template>
  <section id="features-section" class="relative bg-black py-24">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
      <!-- Badge -->
      <SectionBadge class="text-xs"> Features </SectionBadge>

      <!-- Title -->
      <div>
        <SectionTitle
          class="text-4xl md:text-5xl"
          top="Everything you need to build"
          bottom="with powerful AI agents"
        />
      </div>

      <!-- Features -->
      <div class="mt-12 grid w-full gap-8 text-left md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </div>
  </section>
</template>
