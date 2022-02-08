import { resolve } from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  base: "/",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        top: resolve(__dirname, "./index.html"),
        canvas1: resolve(__dirname, "./pages/canvas1/index.html"),
        canvas2: resolve(__dirname, "./pages/canvas2/index.html"),
        canvas3: resolve(__dirname, "./pages/canvas3/index.html"),
      },
    },
  },
});
