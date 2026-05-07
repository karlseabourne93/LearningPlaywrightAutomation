import {test as base, expect, Page} from '@playwright/test';


type MyFixture = {
    navigation: Page;
};

export const test = base.extend<MyFixture>({
    navigation: async ({page}, use) => {
        //The steps before the use command will be executed first and used for setup
        await page.goto('https://www.saucedemo.com/');
        await page.waitForTimeout(1000);
        console.log('fixture message pre use');
        //The use command will give the test the page in its current state
        await use(page);
        //Steps after the use will be done after the test and will be used for teardown
        await page.waitForTimeout(1000);
        console.log('fixture timer post use');
    }
});