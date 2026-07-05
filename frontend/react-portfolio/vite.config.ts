import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    (viteImagemin as any)({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      webp: { quality: 80 }
    })
  ],
  server: {
    watch: {
      ignored: ['**/public/**']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('react-router')) return 'vendor-router';
            const isReactCore = id.includes('/react/') || id.includes('\\react\\') || 
                               id.includes('/react-dom/') || id.includes('\\react-dom\\');
            if (isReactCore) return 'vendor-react';
          }
        }
      }
    }
  }
})

