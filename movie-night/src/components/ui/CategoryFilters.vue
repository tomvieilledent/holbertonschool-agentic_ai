<script setup>
import AppButton from './AppButton.vue'

defineProps({
  categories: { type: Array, required: true },
})
const model = defineModel({ default: 'Tous' })
</script>

<template>
  <div className="flex flex-wrap gap-3">
    <AppButton
      v-for="category in categories"
      :key="category"
      :active="model === category"
      @click="model = category"
    >
      {{ category }}
    </AppButton>
  </div>
</template>

<style scoped>
</style>
