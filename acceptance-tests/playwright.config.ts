import { defineConfig, devices } from '@playwright/test';
import { config } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: config.baseUrl,
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
