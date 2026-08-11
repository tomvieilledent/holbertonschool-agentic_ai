import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Déployé dans un sous-dossier de GitHub Pages pour cohabiter avec react et vue.
  base: command === 'build' ? '/holbertonschool-agentic_ai/svelte/' : '/',
  plugins: [svelte(), tailwindcss()],

  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
}))
