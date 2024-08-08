// vite.config.ts
import { defineConfig } from "file:///C:/Users/rcd72/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/1Grass-Diary-Client/grass-diary/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/rcd72/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/1Grass-Diary-Client/grass-diary/node_modules/@vitejs/plugin-react/dist/index.mjs";
import styleX from "file:///C:/Users/rcd72/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/1Grass-Diary-Client/grass-diary/node_modules/vite-plugin-stylex/dist/index.mjs";
import path from "path";
import svgr from "file:///C:/Users/rcd72/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/1Grass-Diary-Client/grass-diary/node_modules/@svgr/rollup/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\rcd72\\OneDrive\\\uBC14\uD0D5 \uD654\uBA74\\1Grass-Diary-Client\\grass-diary";
var vite_config_default = defineConfig({
  plugins: [react(), styleX(), svgr()],
  server: {
    port: 3e3
  },
  resolve: {
    alias: {
      "@components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "@constants": path.resolve(__vite_injected_original_dirname, "src/constants"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "src/hooks"),
      "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "@services": path.resolve(__vite_injected_original_dirname, "src/services"),
      "@utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      "@icon": path.resolve(__vite_injected_original_dirname, "src/assets/icon"),
      "@state": path.resolve(__vite_injected_original_dirname, "src/state"),
      "@styles": path.resolve(__vite_injected_original_dirname, "src/styles"),
      "@svg": path.resolve(__vite_injected_original_dirname, "src/assets/svg"),
      "@image": path.resolve(__vite_injected_original_dirname, "src/assets/image")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxyY2Q3MlxcXFxPbmVEcml2ZVxcXFxcdUJDMTRcdUQwRDUgXHVENjU0XHVCQTc0XFxcXDFHcmFzcy1EaWFyeS1DbGllbnRcXFxcZ3Jhc3MtZGlhcnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJjZDcyXFxcXE9uZURyaXZlXFxcXFx1QkMxNFx1RDBENSBcdUQ2NTRcdUJBNzRcXFxcMUdyYXNzLURpYXJ5LUNsaWVudFxcXFxncmFzcy1kaWFyeVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcmNkNzIvT25lRHJpdmUvJUVCJUIwJTk0JUVEJTgzJTk1JTIwJUVEJTk5JTk0JUVCJUE5JUI0LzFHcmFzcy1EaWFyeS1DbGllbnQvZ3Jhc3MtZGlhcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHN0eWxlWCBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZXgnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHN2Z3IgZnJvbSAnQHN2Z3Ivcm9sbHVwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIHN0eWxlWCgpLCBzdmdyKCldLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpLFxyXG4gICAgICAnQGNvbnN0YW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29uc3RhbnRzJyksXHJcbiAgICAgICdAaG9va3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2hvb2tzJyksXHJcbiAgICAgICdAcGFnZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXHJcbiAgICAgICdAc2VydmljZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3NlcnZpY2VzJyksXHJcbiAgICAgICdAdXRpbHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxzJyksXHJcbiAgICAgICdAaWNvbic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL2ljb24nKSxcclxuICAgICAgJ0BzdGF0ZSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3RhdGUnKSxcclxuICAgICAgJ0BzdHlsZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0eWxlcycpLFxyXG4gICAgICAnQHN2Zyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL3N2ZycpLFxyXG4gICAgICAnQGltYWdlJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMvaW1hZ2UnKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVosU0FBUyxvQkFBb0I7QUFDdGIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFDakIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ25DLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxlQUFlLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUN2RCxjQUFjLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsTUFDckQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDLFVBQVUsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM3QyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDbkQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDLFNBQVMsS0FBSyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBLE1BQ2xELFVBQVUsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM3QyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDL0MsUUFBUSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDaEQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
