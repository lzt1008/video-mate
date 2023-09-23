import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config'
import packageJson from './package.json'
import { isDev, r } from './scripts/utils'

export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev ? {} : undefined,
    outDir: r('extension/dist/content'),
    emptyOutDir: false,
    lib: {
      entry: r('src/content/index.ts'),
      name: packageJson.name,
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'content-script.js',
        extend: true,
      },
    },
  },
})
