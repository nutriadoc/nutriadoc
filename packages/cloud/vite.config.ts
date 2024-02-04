import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
    minify: true,
    cssMinify: true,
    cssCodeSplit: false,

    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@nutriadoc/cloud',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
      },
      external: [ '@nutriadoc/classes', '@nutriadoc/components' ]
    },
  },
  assetsInclude: ['/sb-preview/runtime.js'],
})