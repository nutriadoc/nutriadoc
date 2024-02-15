// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///D:/Dev/nutria/editor/node_modules/.pnpm/vite@5.0.12_@types+node@18.19.9_sass@1.70.0/node_modules/vite/dist/node/index.js";
import dtsPlugin from "file:///D:/Dev/nutria/editor/node_modules/.pnpm/vite-plugin-dts@3.7.2_@types+node@18.19.9_typescript@5.3.3_vite@5.0.12/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Dev\\nutria\\editor\\packages\\classes";
var vite_config_default = defineConfig({
  plugins: [dtsPlugin()],
  build: {
    sourcemap: true,
    minify: true,
    cssMinify: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "@nutriadoc/classes",
      // the proper extensions will be added
      fileName: (format) => `classes.${format}.js`,
      formats: ["umd", "es"]
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {},
        format: "umd"
      },
      plugins: []
    }
  },
  assetsInclude: ["/sb-preview/runtime.js"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXZcXFxcbnV0cmlhXFxcXGVkaXRvclxcXFxwYWNrYWdlc1xcXFxjbGFzc2VzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEZXZcXFxcbnV0cmlhXFxcXGVkaXRvclxcXFxwYWNrYWdlc1xcXFxjbGFzc2VzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9EZXYvbnV0cmlhL2VkaXRvci9wYWNrYWdlcy9jbGFzc2VzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBkdHNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbZHRzUGx1Z2luKCldLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBzb3VyY2VtYXA6IHRydWUsXHJcbiAgICBtaW5pZnk6IHRydWUsXHJcbiAgICBjc3NNaW5pZnk6IHRydWUsXHJcblxyXG4gICAgbGliOiB7XHJcbiAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50c1xyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcclxuICAgICAgbmFtZTogJ0BudXRyaWFkb2MvY2xhc3NlcycsXHJcbiAgICAgIC8vIHRoZSBwcm9wZXIgZXh0ZW5zaW9ucyB3aWxsIGJlIGFkZGVkXHJcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgY2xhc3Nlcy4ke2Zvcm1hdH0uanNgLFxyXG4gICAgICBmb3JtYXRzOiBbJ3VtZCcsICdlcyddXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXHJcbiAgICAgIC8vIGludG8geW91ciBsaWJyYXJ5XHJcbiAgICAgIGV4dGVybmFsOiBbXHJcbiAgICAgIF0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIFByb3ZpZGUgZ2xvYmFsIHZhcmlhYmxlcyB0byB1c2UgaW4gdGhlIFVNRCBidWlsZFxyXG4gICAgICAgIC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1hdDogXCJ1bWRcIlxyXG4gICAgICB9LFxyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYXNzZXRzSW5jbHVkZTogWycvc2ItcHJldmlldy9ydW50aW1lLmpzJ10sXHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxTQUFTLGVBQWU7QUFDclUsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxlQUFlO0FBRnRCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFBQSxFQUNyQixPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFFWCxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBO0FBQUEsTUFFTixVQUFVLENBQUMsV0FBVyxXQUFXLE1BQU07QUFBQSxNQUN2QyxTQUFTLENBQUMsT0FBTyxJQUFJO0FBQUEsSUFDdkI7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBO0FBQUEsTUFHYixVQUFVLENBQ1Y7QUFBQSxNQUNBLFFBQVE7QUFBQTtBQUFBO0FBQUEsUUFHTixTQUFTLENBQ1Q7QUFBQSxRQUNBLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxTQUFTLENBQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsZUFBZSxDQUFDLHdCQUF3QjtBQUMxQyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
