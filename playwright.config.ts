import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  retries: 2,
  webServer: {
    command: 'npx next dev -p 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://127.0.0.1:3100',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
});
