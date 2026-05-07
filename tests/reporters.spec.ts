//We can specify reporting in the config file
import {test, expect} from '@playwright/test';

test.beforeEach('open application', async({page}) =>{
    await page.goto('https://demowebshop.tricentis.com');

})

test('logotest', async({page}) => {
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
    
});

test('Title Test', async({page}) => {
    expect(await page.title()).toContain('Demo Web shop');    
});

test('Search Test', async({page}) => {
    await page.locator('#small-searchterms').fill('laptop');
    await page.locator('input[value="Search"]').click();
    await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop", {ignoreCase:true});    
});