import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Corrected typo: Added the missing colon in the target URL
        secure: false
      }
    }
  },
  plugins: [react()]
});
