import {test, expect} from '@playwright/test';

test.only("Screenshot examples", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const timestamp = Date.now();

    //page screenshot
    await page.screenshot({path: 'screenshots/'+'homepage'+timestamp+'.png'});

    //Fullpage screenshot
    await page.screenshot({path: 'screenshots/'+'fullHomepage'+timestamp+'.png', fullPage:true});

    //screenshot of a specific element
    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    await logo.screenshot({path: 'screenshots/'+'logo'+timestamp+'.png'});

    //You can configure more screenshot options in the config file in the 'use' method. see playwright.config.ts for more details
});


//This test will fail
//Screenshots will be saved in test results by default unless another path is specified
test("Screenshot from config settings examples", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    await page.locator("test").click();
});