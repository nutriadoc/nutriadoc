import { resolve } from 'path'
import { defineConfig } from 'vite'
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  plugins: [dtsPlugin()],
  build: {
    sourcemap: true,
    minify: true,
    cssMinify: true,

    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@nutriadoc/core',
      // the proper extensions will be added
      fileName: (format) => `index.${format}.js`,
      formats: ['umd', 'es']
    },
  },
  assetsInclude: ['/sb-preview/runtime.js'],
})