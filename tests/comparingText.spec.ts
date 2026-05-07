import {test, expect, Locator} from '@playwright/test';

test("Comparing text", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    const products: Locator = page.locator(".product-title");  //6 are returned

    //1) innerText() vs textContent()
    //innerText() will return the text as it is rendered on the page, while textContent() will return the text as it is in the HTML source code.
    console.log(await products.nth(0).innerText());
    console.log(await products.nth(0).textContent());

    const count = await products.count();

    for(let i=0; i<count; i++){
        console.log(await products.nth(i).innerText());
        console.log(await products.nth(i).textContent());
        //we will need to trim textContent() to remove extra spaces and newlines
        //trim cannot be used on a locator so we will assign it to a variable first
        const productsToBeTrimmed = await products.nth(i).textContent();
        console.log(productsToBeTrimmed?.trim());
    }
    //The above innerText() and textContent() are stored in a single variable and are not part of an array which is why we are using a standard loop instead of a for...of loop


    //2) allInnerTexts() vs allTextContents()
    //allInnerTexts() will return an array of all the innerText() values for the elements in the locator, while allTextContents() will return an array of all the textContent() values for the elements in the locator.
    console.log('product names with allInnerTexts(): ', await products.allInnerTexts());
    console.log('product names with allTextContents(): ', await products.allTextContents());

    //because they are an array we use map to trim the textContent() values
    const allProductsToBeTrimmed = await products.allTextContents();
    console.log('product names with allTextContents() and trim(): ', allProductsToBeTrimmed.map(product => product?.trim()));
    //In the above example we can use all looping types because we are working with an array, so for example we can use a for...of loop to iterate through the array and trim each value or a for...in loop to iterate through the array and trim each value


    //3) allInnerTexts() vs textContent()
    const productsLocator: Locator[] = await products.all();
    console.log(productsLocator);

    //for of loop
    //for of loop will use productLoc as the value of the array
    for (let productLoc of productsLocator) {
        console.log(await productLoc.innerText());
    }

    //for in loop
    //A for in loop will use i as the index of the array
    for(let i in productsLocator){
        console.log(await productsLocator[i].textContent());
    }
});