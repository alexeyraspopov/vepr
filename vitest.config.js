import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "istanbul",
    },
    browser: {
      enabled: true,
      provider: "playwright",
      name: "webkit",
      headless: true,
    },
  },
});
