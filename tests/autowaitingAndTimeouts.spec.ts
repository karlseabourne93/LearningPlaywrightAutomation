import {test, expect, Locator} from '@playwright/test';

test("Autowaiting and forcing example", async ({page}) => {
    //test specific timeout
    test.setTimeout(50000);

    //This will triple the timeout of the test
    //test.slow();


    await page.goto("https://demowebshop.tricentis.com/");

    //Anytime a command is executed in playwright then an autowait will be performed. 
    //These will do initial checks before executing the command, such as checking the element is visible, stable, receives events, is enabled.
    //These checks will by default wait 30 seconds before failing the test - returns a timeout error

    //Assertions - auto wait works
    //We can have command specific timeouts like the below
    await expect(page).toHaveURL("https://demowebshop.tricentis.com", {timeout: 10000});
    await expect(page.locator("text=Welcome to our store")).toBeVisible({timeout: 10000});

    //Actions - aito wait works
    //If we do not want to do all of these checks then we can perform a force action which will skip all of these
    await page.locator("#small-searchterms").fill("Test", {force:true});
    await page.locator(".button-1.search-box-button").click({force:true});


    //Timoeouts can be set locally for individual commands or set globally. This can be done in the global config (see playwright.config.ts for examples)


    //===Types of assertions===
    //1: Auto retrying assertions
    //These will retry while the timeout is still counting up
    //Mostly on page or locator methods like expect(locator).toBeVisible(); .toContainText() etc.

    //2: Non-auto retrying assetions
    //These will not retry and will fail as soon as they hit an error regardless of if they are timed out or not
    //Mostly on values and are like expect(value).toBoGreaterThan(); .toBeLessThan(); etc.
    //This leads to flaky tests so it is best to avoid these assertions if possible
});