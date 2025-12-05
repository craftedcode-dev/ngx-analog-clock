import { defineConfig } from 'vitest/config'
import angular from '@analogjs/vite-plugin-angular'
import path from 'path'

export default defineConfig({
  plugins: [
    angular({
      tsconfig: path.resolve(__dirname, 'tsconfig.spec.json')
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'projects/demo/**/*.spec.ts',
      'projects/analog-clock/**/*.spec.ts'
    ]
  }
})
