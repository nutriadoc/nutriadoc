import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
export default defineConfig({

  build: {
    cssCodeSplit: false,
    sourcemap: true,
    minify: true,
    cssMinify: true,

    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@nutriadoc/components',
      // the proper extensions will be added
      fileName: (format) => `[name].${format}.js`,
      formats: ['es', /*'umd'*/]
    },
    rollupOptions: {
      input: {
        ring: resolve(__dirname, 'src/ring/index.ts'),
        main: resolve(__dirname, 'src/index.ts'),
      },
      external: [
        '@nutriadoc/classes'
      ],
      output: {
        globals: {
        },
        inlineDynamicImports: false,
      },
      plugins: [
        dts()
      ],
    },
  },
  assetsInclude: ['/sb-preview/runtime.js'],
})