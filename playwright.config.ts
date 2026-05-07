import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */

  //===TAGS===
  //To run only tags specified use the below command. See tags.spec.ts for more info
  //grep: '@sanity',
  //grep: '(?=.*@sanity)(?=.*@regression)',
  //grep: '@sanity|@regression',
  //grepInvert: '@sanity',

  //==TIMEOUTS==
  //To change the timeouts globally for all tests
  //timout:60000,

  //To change timeouts for expect commands only then
  //expect{timeout: 30000},

  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  //retry locally
  //retries:3, //editted by Karl


  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,




  //===REPORTERS====
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  //Here we can specify more functionality on our report
  /*
  reporter: [['html', {open: 'on-failure', outputFolder: 'html-report'}],
            ['list'],      //This provides a list report in the terminal. Useful for things like Jenkis where you can't open the UI to reports
            ['line'],
            ['dot'],
            ['junit', {outputFile: 'junit-report'}],
            ['json', {outputFile: 'json-report'}]
],*/
//reporter: 'allure-playwright', //this displays all the above so we don't need to specify the above when using allure

//We csan use our own customer reporter like this
  //reporter: ['./reporter-file.ts', {customerOption: 'some value'}],


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    //===SCREENSHOT===
    //Screenshot settings can also be configured here, captured by paven
    //screenshot: 'off',    //By default turns the screenshot settings to off
    //screenshot:''on',     //turning this on then everytime a test is run a screenshot is taken regardless of result
    //screenshot: 'on-first-failure', //Only takes a screenshot if a test first fails, used for flaky tests
    screenshot: 'only-on-failure',  //takes a screenshot on any failure

    //===VIDEO===
    video: 'retain-on-failure', //only captures the video when there is a failure

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',
    trace: 'on',

    /*
    Here we can change the test id attribute to look for something other that data-testId
    testIdAttribute: 'data-pw'
    */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
/*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
