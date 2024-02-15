/// <reference types="vite/client" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url"
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
      name: 'nutria',
      // the proper extensions will be added
      fileName: (format) => `nutria.${format}.js`,
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
          nutria: 'Nutria'
        },
        format: "umd"
      },
      plugins: [
      ],
    },
  },
  assetsInclude: ['/sb-preview/runtime.js'],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
    ]
  }
})