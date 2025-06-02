import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure correct MIME types are served
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
})