import {test, expect, chromium} from '@playwright/test';

test("Handle Tabs", async ()=> {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    //If we create a page and gop to below url, when we press New Tab button a new tab will be created
    const parentPage = await context.newPage();
    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    //We need to create a new context for this tab so that we can interact with it
    //This is an event and we need to do this before we click the button that opens a new tab
    //And given a tab is a page we put in the 'page' into the method
    //Because the two commands below return promises this means they need to be run asyncronous (one command is ran to completion and then the next command is ran)
    //We do not want this when handling multiple tabs
    //This is because the event handler is waiting for the new tab which will never come because the button is not clicked
    /* ==== Referenced Commands ====
        context.waitForEvent('page');
        parentPage.locator("button:has-text('New Tab')").click();
    */


    //We then use Promise method to handle this
    //The Promise method will wait until both promises are completed
    //Once this is done then the Promise method will return another promise
    //We put the statements into an array [] seperated with a , 
    //The first statement returns a promise of a page Promise:<Page> so we need to store this in a const and will be able to manipulate this later in the tests
    //Because the childPage constant can return a void type, which we want to avoid, we put it in [] which forces Page
    const [childPage] = await Promise.all([context.waitForEvent('page'), parentPage.locator("button:has-text('New Tab')").click()])



    //There are 2 ways to handle multple pages
    //==Approach 1: Switch between pages and get titles (using context)==
    //Store the context pages into an array
    const pages = context.pages();
    console.log("Number of current pages: " + pages.length);

    //We can then use this array to and indexes for whichever page we want
    console.log("Title of the Parent page: " + await pages[0].title())
    console.log("Title of the Child page: " + await pages[1].title())


    //==Approach 2: using the pages that we created==
    console.log("Title of the Parent page: " + await parentPage.title())
    console.log("Title of the Child page: " + await childPage.title())

    //If you have more than 2 pages then go with approach 1 as it is easier to maintain


});