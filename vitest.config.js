import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "istanbul",
    },
    browser: {
      // https://github.com/vitest-dev/vitest/issues/4173
      enabled: !process.env.CI,
      provider: "playwright",
      name: "webkit",
      headless: true,
    },
  },
});
