<script setup>
import Brand from '../ui/Brand.vue'
import Button from '../ui/Button.vue'

const navLinks = [
  { label: 'About', href: '#about-section' },
  { label: 'Features', href: '#features-section' },
  { label: 'Insights', href: '#insights-section' },
  { label: 'Contact', href: '#contact-section' },
]
</script>

<template>
  <header
    class="fixed top-0 right-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur"
  >
    <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
      <!-- Logo -->
      <Brand />

      <!-- Navigation + CTA -->
      <div class="flex items-center gap-8">
        <nav class="hidden text-xs text-slate-400 md:flex">
          <ul class="flex gap-8">
            <li v-for="link in navLinks" :key="link.label">
              <a class="transition-colors hover:text-slate-50" :href="link.href">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <Button href="https://www.holbertonschool.fr/rejoindre-lhippocamp" class="text-xs">
          Enroll now
        </Button>
      </div>
    </div>
  </header>
</template>
