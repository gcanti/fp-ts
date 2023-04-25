/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['./test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['./test/**/util.ts'],
    globals: true,
    coverage: {
      provider: 'istanbul'
    }
  }
})
