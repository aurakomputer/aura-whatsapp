// vite.config.js
import { fileURLToPath, URL } from "url";
import { defineConfig } from "file:///home/deve/projects/aura-wa/baileys-api/node_modules/.pnpm/vite@4.3.9_sass@1.32.12/node_modules/vite/dist/node/index.js";
import vue from "file:///home/deve/projects/aura-wa/baileys-api/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { quasar, transformAssetUrls } from "file:///home/deve/projects/aura-wa/baileys-api/node_modules/.pnpm/@quasar+vite-plugin@1.3.3_@vitejs+plugin-vue@4.2.3_quasar@2.12.0_vite@4.3.9_vue@3.3.4/node_modules/@quasar/vite-plugin/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///home/deve/projects/aura-wa/baileys-api/vite.config.js";
var vite_config_default = defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: fileURLToPath(new URL("./src/client", __vite_injected_original_import_meta_url)) }]
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      autoImportComponentCase: "combined"
      // sassVariables: 'src/quasar-variables.sass',
    })
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXZlL3Byb2plY3RzL2F1cmEtd2EvYmFpbGV5cy1hcGlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2RldmUvcHJvamVjdHMvYXVyYS13YS9iYWlsZXlzLWFwaS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9kZXZlL3Byb2plY3RzL2F1cmEtd2EvYmFpbGV5cy1hcGkvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBxdWFzYXIsIHRyYW5zZm9ybUFzc2V0VXJscyB9IGZyb20gJ0BxdWFzYXIvdml0ZS1wbHVnaW4nXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IFt7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY2xpZW50JywgaW1wb3J0Lm1ldGEudXJsKSkgfV0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHZ1ZSh7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHF1YXNhcih7XG4gICAgICAgICAgICBhdXRvSW1wb3J0Q29tcG9uZW50Q2FzZTogJ2NvbWJpbmVkJyxcbiAgICAgICAgICAgIC8vIHNhc3NWYXJpYWJsZXM6ICdzcmMvcXVhc2FyLXZhcmlhYmxlcy5zYXNzJyxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIHVzZVBvbGxpbmc6IHRydWUsXG4gICAgICAgIH0sXG4gICAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsZUFBZSxXQUFXO0FBQzFVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLFFBQVEsMEJBQTBCO0FBSDJJLElBQU0sMkNBQTJDO0FBTXZPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFhLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDLEVBQUUsQ0FBQztBQUFBLEVBQy9GO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsTUFDQSxVQUFVLEVBQUUsbUJBQW1CO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0gseUJBQXlCO0FBQUE7QUFBQSxJQUU3QixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osT0FBTztBQUFBLE1BQ0gsWUFBWTtBQUFBLElBQ2hCO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
