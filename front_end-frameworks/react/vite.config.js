import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Déployé dans un sous-dossier de GitHub Pages pour cohabiter avec le projet vue.
  base: command === 'build' ? '/holbertonschool-agentic_ai/react/' : '/',

  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
}))
