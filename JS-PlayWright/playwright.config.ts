import { defineConfig, devices } from '@playwright/test';
 
export default defineConfig({
  testDir: './tests',
  testMatch: ["**/*.spec.ts", "**/*.spec.js", "**/*.test.js"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    navigationTimeout: 20000,
    trace: 'off',
  },
 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],

});
