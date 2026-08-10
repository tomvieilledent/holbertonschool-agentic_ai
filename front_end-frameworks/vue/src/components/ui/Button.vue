<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: { type: String, required: true },
  variant: { type: String, default: 'primary' },
  external: { type: Boolean, default: false },
})

const variants = {
  primary: 'bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40 hover:bg-violet-600',
  secondary: 'border border-slate-800 bg-slate-950 text-slate-50 hover:bg-slate-900',
}

const variantClass = computed(() => variants[props.variant])
const externalAttrs = computed(() =>
  props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {},
)
</script>

<template>
  <a
    :href="href"
    v-bind="externalAttrs"
    class="inline-block rounded-md px-4 py-2 font-semibold transition-colors"
    :class="variantClass"
  >
    <slot />
  </a>
</template>
