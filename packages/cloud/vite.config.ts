import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
    minify: true,
    cssMinify: true,
    cssCodeSplit: false,

    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@nutriadoc/cloud',
      // the proper extensions will be added
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es',]
    },
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/login/index.ts'),
        console: resolve(__dirname, 'src/console/index.ts'),
      },
      external: [
      ],
      output: {
        inlineDynamicImports: false,
        // assetFileNames: '[name].[ext]',
/*        assetFileNames: (assetInfo) => {
          console.debug(assetInfo)
          debugger
          return assetInfo.name
        }*/
      },
      plugins: [
      ],
    },
  },
  assetsInclude: ['/sb-preview/runtime.js'],
})