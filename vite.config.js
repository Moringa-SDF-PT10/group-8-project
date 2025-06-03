import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Set to '/' for root domain or '/subpath/' if needed
  build: {
    outDir: 'dist', // Ensure this matches Netlify's publish dir
    assetsDir: 'assets', // Default (where JS/CSS are stored)
  }
});