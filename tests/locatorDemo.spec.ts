import {test, expect, Locator} from '@playwright/test';

test('Locator Demo', async ({page}) => {
    await page.goto('https://demo.nopcommerce.com');
    //await page.waitForTimeout(3000);

    //getByAltText Example
    //here we are creating a variable to store the locator and then using that variable in the expect check
    const logo:Locator = page.getByAltText('nopCommerce demo store');
    await expect(logo).toBeVisible();
    //here we are directly using the locator in the expect check without storing it in a variable
    await expect(page.getByAltText('nopCommerce demo store')).toBeVisible();


    //getByText Example
    const homepageText:Locator = page.getByText('Welcome to our store');
    await expect(homepageText).toBeVisible();

    //getByRole Example
    await expect(page.getByRole('menuitem', {name: 'Computers'})).toBeVisible();

    //getByTitle Example
    const searchBox:Locator = page.getByTitle('Search store');
    await expect(searchBox).toBeVisible();

    //getByLabel Example
    const searchBoxLabel:Locator = page.getByLabel('Search store');
    await expect(searchBoxLabel).toBeVisible();

    //getByTestId Example
    const searchBoxTestId:Locator = page.getByTestId('small-searchterms');
    await expect(searchBoxTestId).toBeVisible();

    //getByPlaceholder Example
    const searchBoxPlaceholder:Locator = page.getByPlaceholder('Search store');
    await expect(searchBoxPlaceholder).toBeVisible();
    

    //and the same for getByTitle, getByLabel, getByTestId etc.

    //If a dev changes the test attribute we are using (EG say is all of the data-testId are changed to data-pw in a resturcture) then we can configure the test id attribute of what we are looking for in the playwright.config.ts file. Please refer to that file to see how
    //In other words we can change the test id attribute from data-testId to something else in the config files using "testIdAttribute: 'data-pw'"
});