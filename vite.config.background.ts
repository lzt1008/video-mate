import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config'
import packageJson from './package.json'
import { isDev } from './lib/utils'

export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev ? {} : undefined,
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, './src/background/index.ts'),
      name: packageJson.name,
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'service-worker.js',
        extend: true,
      },
    },
  },
})
