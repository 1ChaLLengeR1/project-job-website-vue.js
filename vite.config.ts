import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  preview: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser", // 🚀 Możesz ustawić na "false", jeśli kompresja trwa za długo
    sourcemap: false, // 🚀 Wyłącza mapy źródłowe, przyspiesza build
    reportCompressedSize: false, // 🚀 To zastępuje brotliSize w nowych wersjach Vite
    cssCodeSplit: true, // 🚀 Podział CSS na mniejsze pliki, jeśli projekt jest duży
    chunkSizeWarningLimit: 2000, // 🚀 Zapobiega ostrzeżeniom o zbyt dużych plikach
  },
});
