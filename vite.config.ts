import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // Use environment variable to support both Vercel (root) and GitHub Pages (subdirectory)
  base: import.meta.env.VITE_BASE_PATH || '/',
})
