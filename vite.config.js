import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

// Plugin to copy assets folder to public during build
const copyAssetsPlugin = () => {
  return {
    name: 'copy-assets',
    buildStart() {
      // Copy assets to public folder so they're available in production
      const assetsSource = join(process.cwd(), 'assets');
      const assetsDest = join(process.cwd(), 'public', 'assets');
      
      if (!existsSync(assetsSource)) {
        console.warn('Assets folder not found at:', assetsSource);
        return;
      }
      
      const copyRecursive = (src, dest) => {
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true });
        }
        
        const entries = readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
          const srcPath = join(src, entry.name);
          const destPath = join(dest, entry.name);
          
          if (entry.isDirectory()) {
            // Skip node_modules and other unnecessary folders
            if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
              continue;
            }
            copyRecursive(srcPath, destPath);
          } else {
            // Only copy if destination doesn't exist or source is newer
            if (!existsSync(destPath) || statSync(srcPath).mtime > statSync(destPath).mtime) {
              copyFileSync(srcPath, destPath);
            }
          }
        }
      };
      
      try {
        copyRecursive(assetsSource, assetsDest);
        console.log('✓ Assets copied to public folder for production build');
      } catch (error) {
        console.error('Error copying assets:', error);
      }
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copyAssetsPlugin()],
  base: "/",
  publicDir: 'public', // Explicitly set public directory
  server: {
    host: '127.0.0.1', // Explicitly bind to 127.0.0.1 instead of localhost
    port: 5176, // Change this to any port you want (e.g., 3000, 8080, etc.)
    strictPort: false, // If true, will fail if port is in use. If false, will try next available port
  },
  build: {
    chunkSizeWarningLimit: 1000,
    // Ensure public assets are copied
    copyPublicDir: true,
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
