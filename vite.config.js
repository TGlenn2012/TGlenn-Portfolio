import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    host: '127.0.0.1', // Explicitly bind to 127.0.0.1 instead of localhost
    port: 5176, // Change this to any port you want (e.g., 3000, 8080, etc.)
    strictPort: false, // If true, will fail if port is in use. If false, will try next available port
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'particles': ['@tsparticles/react', '@tsparticles/slim'],
        },
      },
    },
  },
})
