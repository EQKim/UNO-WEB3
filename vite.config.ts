import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// Inject a build-time stamp so each deploy produces a distinct bundle
const buildTime = new Date().toISOString();

export default defineConfig({
  plugins: [vue()],
  base: "/UNO-WEB3/",
  server: {
    port: 5173
  },
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime)
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        react: resolve(__dirname, "react.html")
      }
    }
  }
});
