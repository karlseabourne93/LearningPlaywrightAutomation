//imports these functions from the Playwright test library, which allows us to write and run tests for web applications. 
import {test, expect} from '@playwright/test';

//The format of creating a test case using the 'test' function. 
// The first argument is a string that describes the title of the test, and the second argument is an asynchronous function that contains the actual test code. 
// Asynchronous function allows us to use 'await' to handle asynchronous operations, such as navigating to a web page or interacting with elements on the page.
// This function takes the 'page' object as an argument, which represents a single tab or window in the browser.

test('This is the title', async ({page}) => {
   await page.goto('https://automationexercise.com/');
   await expect(page).toHaveTitle('Automation Exercise');
});