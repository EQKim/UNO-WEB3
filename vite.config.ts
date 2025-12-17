import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Vite config with Web Worker support
export default defineConfig({
  plugins: [vue()],
  worker: {
    format: "es", // Use ES modules in workers
  },
});
