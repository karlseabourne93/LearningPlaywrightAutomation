import {test, expect, Locator} from '@playwrigtht/test';

test('Hard Vs Soft', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/');

    //Hard Assertions - Will fail the test is a step fails
    await expect(page).toHaveTitle('Demo Web Shop2') //This will fail and this test will fail
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');


    //Soft assertions - if a step fails then can carry on with the rest of the test
    await expect.soft(page).toHaveTitle('Demo Web Shop2') //This will fail but this test will carry on
    await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/');
});