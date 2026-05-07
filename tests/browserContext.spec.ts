import {test, expect, Locator, Page, chromium} from '@playwright/test';

//Browser --> Context --> pages
//Broswer:  Chrome, Firefox, Edge etc.
//Context:  We can create multiple contexts for multiple users in the same browser.
//Pages:    Either a tab, or a window, or a popup
//Normally we import the page and use that, that will luse the default conext and browser when starting the test

//We can specify the Context or the browser. Here we are doing context. 
//Once context has been created we need to import the Page library to use page functions, create a new page constant and then we can use the page like normal.
test("Context example", async ({context}) => {
    const aPage:Page = await context.newPage();
    await aPage.goto("www.google.com");

});

//When passing the browser in the test we then have to create a constext variable. the create a page vaiable using the context
test("Browser Example", async ({browser}) => {
    const aContext = await browser.newContext();
    const aPage = await aContext.newPage();
    await aPage.goto("www.google.com");

});

//We can use different browsers away from the default here
//We import the browser library that we want
//Doing it this we we do not need to import anything into the test as we are doing it ourselves
test("Using different browsers Example", async () => {
    const aBrowser = await chromium.launch(); 
    const aContext = await aBrowser.newContext();
    const aPage = await aContext.newPage();
    await aPage.goto("www.google.com");

});

test.only("Multiple pages Example", async () => {
    const aBrowser = await chromium.launch(); 
    const aContext = await aBrowser.newContext();

    //Multiple Pages with the same context
    const aPage = await aContext.newPage();
    const aPage2 = await aContext.newPage();
    console.log("Number of pages: " + aContext.pages().length);

    await aPage.goto("https://playwright.dev/");
    await expect(aPage).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

    await aPage2.goto("https://www.selenium.dev/");
    await expect(aPage2).toHaveTitle("Selenium");

    await aPage.waitForTimeout(2000);
    await aPage.close();
    await aPage2.waitForTimeout(2000);

});