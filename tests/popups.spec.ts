import {test, expect, Page} from '@playwright/test';

//Look at browserContext.spec.ts and tabs.spec.ts before this
test("Popup example", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Multiple popups
    await Promise.all([page.waitForEvent('popup'), await page.locator("#PopUp").click()]);
    await Promise.all([page.waitForEvent('popup'), await page.locator("#PopUp").click()]);

    //page.waitForTimeout(2000);
    const allPopupWindows = context.pages();
    console.log("Number of windows/popups: " + allPopupWindows.length);
    console.log("All Titles");

    console.log(await allPopupWindows[0].title());
    console.log(await allPopupWindows[1].title());
    console.log(await allPopupWindows[2].title());

    //Say we want to navigate around the playwright page but we do not know which index it is stored in
    //Then we can use a for loop and if statement to do this
    for(let pw of allPopupWindows){
        const pageTitle = await pw.title();
        if(pageTitle.includes('Playwright')){
            await pw.getByRole('link', {name: 'Get Started'}).click();
            expect(pw.url()).toBe("https://playwright.dev/docs/intro");
            console.log("SUCCESS!");
            break;
        }
    }
});