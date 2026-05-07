import {test, expect} from '@playwright/test';

//Look at popup.spec.ts first
test("Authenticated popups Approach 1 - Not Preferable as modifying url", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    //There are a few ways to handle authentication popups
    //Approach 1: Directly pass log in credentials with the url
    //when a popup asks us for a username and password then we can pass this in the URL before going to the url
    //For this url: https://the-internet.herokuapp.com/basic_auth
    //This is the syntax
    //https://username:password@the-internet.herouapp.com/basic_auth
    await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    await expect(page.locator('text=Congratulations')).toBeVisible();
})


test("Authenticated popups Approach 2", async ({browser}) => {
    //Aproach 2: pass ther credentials along with the browser context
    const context = await browser.newContext({httpCredentials: {username:'admin', password:'admin'}});
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await expect(page.locator('text=Congratulations')).toBeVisible();
});