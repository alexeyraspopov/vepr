import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/vepr",
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "docs/index.html"),
        interaction: resolve(__dirname, "docs/interaction.html"),
      },
    },
  },
});
