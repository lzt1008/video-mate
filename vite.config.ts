import process from 'node:process'
import { resolve } from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export const sharedConfig: UserConfig = {
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}

export default defineConfig({
  ...sharedConfig,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        popup: resolve(__dirname, 'popup.html'),
      },
    },
  },
})
