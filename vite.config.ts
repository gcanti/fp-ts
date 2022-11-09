/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    include: ['./test/*.ts'],
    exclude: ['./test/util.ts'],
    coverage: {
      provider: 'istanbul'
    }
  }
})
