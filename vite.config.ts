import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Your existing optimization setting is preserved
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  // NEU: Hinzugefügt für das lokale Backend-Proxy
  // This tells the Vite dev server how to talk to your backend API
  server: {
    proxy: {
      // Any request starting with /api will be forwarded to your backend
      '/api': {
        target: 'http://localhost:3001', // Your Express server's address
        changeOrigin: true, // Recommended for virtual hosts
      },
    }
  }
});
