import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js", // ensure TailwindCSS works
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // local backend
        changeOrigin: true,
      },
    },
  },
});
