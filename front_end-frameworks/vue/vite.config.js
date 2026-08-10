import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Déployé dans un sous-dossier de GitHub Pages pour cohabiter avec le projet react.
  base: command === 'build' ? '/holbertonschool-agentic_ai/vue/' : '/',
  plugins: [vue(), tailwindcss()],

  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
}))
