import { resolve } from 'path'
import { defineConfig } from 'vite'
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'quill-attachment',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [
        'quill',
      ]
    },
  },
  assetsInclude: ['/sb-preview/runtime.js'],
  plugins: [dtsPlugin()]
})