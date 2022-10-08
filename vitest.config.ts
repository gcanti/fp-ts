/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["packages/*/_test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["packages/*/_test/**/util.ts"],
    globals: true
  },
  resolve: {
    alias: {
      "@fp-ts/core/test": path.resolve(__dirname, "/packages/core/_test"),
      "@fp-ts/core": path.resolve(__dirname, "/packages/core/_src")
    }
  }
})
