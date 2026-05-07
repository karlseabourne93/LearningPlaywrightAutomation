import {test, expect} from '@playwright/test';

//Retry is set up in the config files and will be defaulted to running in the CI environment.
//We can change this to work locally
//in the config put 'retries:3,' in the defineConfig method (making sure other retries have been commented out)
//This will retry the test up to 3 times if it fails
//We will manually interupt the test twice before letting the test complete on the third time
//run test in headed mode
test("Flaky Test Retries", async ({page}) => {
  await page.goto('https://demoblaze.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();

  //interupt the test manually here to see retries in action (click on the logout button)
  //monitor the terminal to see the results
  //Should also show in the logs what the retry status was
  await page.waitForTimeout(8000);

  await expect(page.getByRole('link', { name: 'Welcome pavanol' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
});

//If retries isn't set in the config file then we can specify retires in the console command
//npx playwright test tests/flakyTestRetries.spec.ts --retries=3