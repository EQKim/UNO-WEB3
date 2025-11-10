import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Inject a build-time stamp so each deploy produces a distinct bundle
const buildTime = new Date().toISOString();

export default defineConfig({
  plugins: [vue()],
  base: "/UNO-WEB3/",
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime)
  }
});
