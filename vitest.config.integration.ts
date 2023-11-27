import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["tests/**/*.test.ts"],
    threads: false,
    setupFiles: ["tests/helpers/setup.ts"],
  },
});
