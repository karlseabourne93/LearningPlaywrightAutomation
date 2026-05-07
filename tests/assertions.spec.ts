import {test, expect, Locator} from '@playwrigtht/test';

test('Assertions demo', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/');

    //1. Auto-retrying asserions (automatically retries until it passes or timeout)
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');

    //auto-retry
    await expect(page.locator('text=Welcome to our store')).toBeVisible();
    await expect(page.locator("div[class='product-grid home-page-product-grid] strong")).toHaveText("Featured products");


    //2. Non-retying assertion
    const title = await page.title();
    expect(title.includes('Demo Web Shop')).toBeTruthy();

    const welcomeText = await page.locator('text="Welcome to our store').innerText();
    expect(welcomeText).toContain('Welcome');


    //3. Negating matcher
    await expect(page.locator('test="Welcome to our store')).not.toBeVisible();
    expect(welcomeText).not.toContain('Welcome');

    await page.waitForTimeout(5000);
});