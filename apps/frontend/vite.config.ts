import react from '@vitejs/plugin-react'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: './public',
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      types: path.resolve(__dirname, './src/types'),
      services: path.resolve(__dirname, './src/services'),
      hooks: path.resolve(__dirname, './src/hooks'),
      context: path.resolve(__dirname, './src/context'),
      utils: path.resolve(__dirname, './src/utils'),
      pages: path.resolve(__dirname, './src/pages'),
      bulbot: path.resolve(__dirname, './src/bulbot'),
    },
  },
  plugins: [react(), UnoCSS()],
})
