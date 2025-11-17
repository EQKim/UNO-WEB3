import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Minimal Vite config to enable .vue handling
export default defineConfig({
  plugins: [vue()],
});
