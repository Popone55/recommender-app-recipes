import tanstackRouter from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({ autoCodeSplitting: true }), react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@dictionaries': path.resolve(__dirname, './src/dictionaries'),
      '@tests': path.resolve(__dirname, './src/tests')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    css: true
  }
})
