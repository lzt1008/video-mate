import process from 'node:process'
import { resolve } from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { isDev, r } from './scripts/utils'

export const sharedConfig: UserConfig = {
  root: r('src'),
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
    outDir: r('extension/dist'),
    sourcemap: isDev ? 'inline' : false,
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        main: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
      },
    },
  },
})
