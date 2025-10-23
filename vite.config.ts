import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // Serve from root during development and production by default.
  // If you deploy to a sub-path (e.g., GitHub Pages), set `base` accordingly.
})
