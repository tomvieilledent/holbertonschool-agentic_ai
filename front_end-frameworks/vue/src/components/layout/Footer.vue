<script setup>
import { Camera, Music2, X, Play } from 'lucide-vue-next'
import Brand from '../ui/Brand.vue'
import SocialLink from '../ui/SocialLink.vue'

const socialLinks = [
  { icon: Camera, label: 'Instagram', href: 'https://www.instagram.com' },
  { icon: Music2, label: 'TikTok', href: 'https://www.tiktok.com' },
  { icon: X, label: 'X', href: 'https://www.x.com' },
  { icon: Play, label: 'YouTube', href: 'https://www.youtube.com' },
]

const navLinks = [
  { label: 'Home', href: '#hero-section' },
  { label: 'About', href: '#about-section' },
  { label: 'Features', href: '#features-section' },
  { label: 'Insights', href: '#insights-section' },
  { label: 'Contact', href: '#contact-section' },
]

const externalLinks = [
  { label: 'About', href: 'https://www.holbertonschool.fr/' },
  {
    label: 'Methodology',
    href: 'https://www.holbertonschool.fr/methodologie',
  },
  { label: 'Story', href: 'https://www.holbertonschool.fr/a-propos' },
  { label: 'Agenda', href: 'https://www.holbertonschool.fr/' },
]

const curriculumLinks = [
  {
    label: 'Bachelor',
    href: 'https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering',
  },
  {
    label: 'Program',
    href: 'https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering#programme',
  },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-800 bg-black">
    <div class="mx-auto w-full max-w-6xl px-6 py-16">
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <Brand />

          <p class="max-w-xs text-sm text-slate-400">
            Explore the future of development with Agentic AI.
          </p>

          <!-- Social links -->
          <ul class="flex gap-3">
            <li v-for="social in socialLinks" :key="social.label">
              <SocialLink :href="social.href" :label="social.label" :icon="social.icon" />
            </li>
          </ul>
        </div>

        <!-- Internal navigation -->
        <nav aria-label="Footer navigation">
          <h3 class="text-sm font-bold text-slate-50">Navigation</h3>
          <ul class="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <li v-for="link in navLinks" :key="link.label">
              <a :href="link.href" class="transition-colors hover:text-slate-50">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- External links -->
        <div>
          <h3 class="text-sm font-bold text-slate-50">Holberton School</h3>
          <ul class="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <li v-for="link in externalLinks" :key="link.label">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${link.label} — Holberton School`"
                class="transition-colors hover:text-slate-50"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Curriculum links -->
        <div>
          <h3 class="text-sm font-bold text-slate-50">Curriculum</h3>
          <ul class="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <li v-for="link in curriculumLinks" :key="link.label">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${link.label} — Curriculum`"
                class="transition-colors hover:text-slate-50"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 border-t border-slate-800 pt-8 text-center text-xs text-slate-400">
        © {{ currentYear }} Agentic AI. Built for Holberton School.
      </div>
    </div>
  </footer>
</template>
