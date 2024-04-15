import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: { headless: true },
  testMatch: /.*\.spec\.js/,
  reporter: [["list"], ["rollwright/coverage-reporter"]],
});
