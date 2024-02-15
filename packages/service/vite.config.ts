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
      name: '@nutriadoc/service',
      // the proper extensions will be added
      fileName: (format) => `index.${format}.js`,
      formats: ['umd', 'es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
        },
        format: "umd"
      },
      plugins: [
      ],
    },
  },
  assetsInclude: ['/sb-preview/runtime.js'],
})