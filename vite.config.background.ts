import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config'
import packageJson from './package.json'
import { isDev, r } from './scripts/utils'

export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev ? {} : undefined,
    emptyOutDir: false,
    lib: {
      entry: r('./src/background/main.tsx'),
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
