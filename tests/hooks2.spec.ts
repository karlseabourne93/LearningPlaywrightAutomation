//If we use the page fixture in the before each/all tests then we need to continue that instance of it in the other tests
//To do this we need to make the page global and then pass this throughout the tests
import {test, expect, Page} from '@playwright/test';


/*
    open app --> before all

        log in --> before each
            find number of products
        log out --> after each

        log in
            add product to cart
        log out

    close app --> After all
*/

//Here we are creating an empty page outside of all the tests so that it is a global variable that will be available to all tests
let page:Page;
//Here we are passing in the browser fixture so that we can create and assign a new page to the page variable
test.beforeAll('Open app', async ({browser}) =>{
    page = await browser.newPage();
    await page.goto('https://demoblaze.com/');
});

//Here we do not need to pass in the page fixture in the test method as page is already a global variable that was created before and thus can be accessed by the test
test.afterAll('Close app', async () => {
    await page.close();
})

//
test.beforeEach('Log in', async() =>{
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
});

test.afterEach('log out', async()=>{
    await page.getByRole('button', {name: 'Log Out'});
});

//test.describe will group tests together. 
//The before and after hooks will also work with any tests inside this group
//If the before and after hooks were inside the describe hook then they would only apply to the tests in the describe block
test.describe('This is my group', async() => {

    test('Find number of products', async() =>{
        const products = page.locator('#tbodyid .hrefch');
        const count = await products.count();
        console.log('Number of products are: ' + count);
        await expect(products).toHaveCount(9);

    });

    test('Add products to the cart', async() =>{
        await page.locator('text="Samsung galaxy s6"').click();

        //handle alert
        page.on('dialog', async(dialog) => {
            expect(dialog.message()).toContain('Product added');
            await dialog.accept();
        });

        await page.locator('.btn.btn-success.btn-lg').click();

    });

}) 