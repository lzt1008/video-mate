import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config'
import packageJson from './package.json'

export default defineConfig({
  ...sharedConfig,
  build: {
    lib: {
      entry: resolve(__dirname, './lib/content-script.ts'),
      name: packageJson.name,
      formats: ['iife'],
    },
  },
})
