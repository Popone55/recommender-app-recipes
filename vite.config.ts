import tanstackRouter from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({ autoCodeSplitting: true }), react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@dictionaries': path.resolve(__dirname, './src/dictionaries'),
      '@tests': path.resolve(__dirname, './src/tests')
    }
  }
})
