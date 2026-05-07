import { test, expect, Locator } from '@playwright/test';

test('Navigate to demo web shop and verify feature products are displayed', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://demowebshop.tricentis.com/');

    //absolute xapth
    const logoImage:Locator = page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    await expect(logoImage).toBeVisible();

    //relative xpath - logo
    const relativeLogoImage:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(relativeLogoImage).toBeVisible();


    //contains()
    const products:Locator = page.locator("//h2/a[contains(@href, 'computer')]");

    const productCount:number = await products.count();
    console.log(`Number of products found: ${productCount}`);
    expect(productCount).toBeGreaterThan(0);

    console.log("First product text: " + await products.first().textContent());
    console.log("Last product text: " + await products.last().textContent());
    console.log("All products text: " + await products.allTextContents());
    console.log("nth product text: " + await products.nth(1).textContent());

    let productTitles:string[] = await products.allTextContents();
    for (let pt of productTitles) {
        console.log(pt);
    }

    //Start with
    const buildingProducts:Locator = page.locator("//h2/a[starts-with(@href, '/build')]");
    const count : number = await buildingProducts.count();
    expect(count).toBeGreaterThan(0);

    //text()
    const regLink:Locator = page.locator("//a[text()='Register']");
    await expect(regLink).toBeVisible();

    //last()
    const lastItem:Locator = page.locator("//div[@class='column follow-us']//li[last()]");
    console.log("Last Item text: " + await lastItem.textContent());

    //position()
    const positionItem:Locator = page.locator("//div[@class='column follow-us']//li[position()=3]");
    console.log("Position Item text: " + await positionItem.textContent());

});

//Dynamic Xpath
test('Dynamic Xpath example', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //loop to press the button 5 times to make sure the dynamic element is generated
    for (let i = 0; i < 5; i++) {
        //Dynamic xpath for when elements change
        let button:Locator = page.locator('//button[@name="start" or @name="stop"]');
        //This can be done using playwright specific locators too
        //let button:Locator = page.getByRole('button', {name: /start|stop/});

        await button.click();
        await page.waitForTimeout(1000);
    }

});