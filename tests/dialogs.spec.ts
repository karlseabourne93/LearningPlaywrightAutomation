//alert(), confirmd(), prompt(), dialogs/JSalerts
//Dialogs are automatically handled by playwright, but we can still interact with them when needed using dialog handler before the dialog is triggered.
//dialog.accept() or dialog.dismiss()

import {test, expect, Locator} from '@playwright/test';

test("Simple dialogs", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const simpleAlertButton:Locator = await page.getByRole('button', {name: 'Simple Alert'});

    //create the dialog handler before the dialog is triggered
    //page.on('dialog', dialog => dialog.accept());  //This will jsut straight up accept it with no other functionality
    //However we may want to do more checks on the dialog so we can do something similar to the below
    page.on('dialog', dialog => {
        console.log("Dialog type is: ", dialog.type());
        expect(dialog.type()).toContain('alert');

        console.log("Dialog message is: ", dialog.message());
        expect(dialog.message()).toEqual("I am an alert box!");
        //console.log("Dialog default value is: ", dialog.defaultValue());
        //console.log("Dialog page value is: ", dialog.page());
        
        dialog.accept()
    })
    await simpleAlertButton.click();

});

test("Confirmation alert", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const confirmationAlertButton:Locator = await page.getByRole('button', {name: 'Confirmation Alert'});

    page.on('dialog', dialog => {
        console.log("Dialog type is: ", dialog.type());
        expect(dialog.type()).toContain('confirm');

        console.log("Dialog message is: ", dialog.message());
        expect(dialog.message()).toEqual("Press a button!");
        //console.log("Dialog default value is: ", dialog.defaultValue());
        //console.log("Dialog page value is: ", dialog.page());
        dialog.accept();  //close by accepting
        //dialog.dismiss();  //close by cancelling 
    })
    await confirmationAlertButton.click();

    //const alertMessage:Locator = await page.locator('.widget-content p#demo');
    const alertMessage:Locator = await page.getByText('You pressed OK!');
    console.log("This is the text: " + await alertMessage.innerText())
    await expect(alertMessage).toContainText('You');

});

test("Prompt alert", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const promptAlertButton:Locator = await page.getByRole('button', {name: 'Prompt Alert'});

    page.on('dialog', dialog => {
        console.log("Dialog type is: ", dialog.type());
        expect(dialog.type()).toContain('prompt');

        console.log("Dialog message is: ", dialog.message());
        expect(dialog.message()).toContain("Please enter your name:");

        //get the default value
        expect(dialog.defaultValue()).toContain("Harry Potter");

        //input into the prompt and accept the prompt

        dialog.accept('Joe Blogs');  //close by accepting
        //dialog.dismiss();  //close by cancelling 
    })
    await promptAlertButton.click();

    const text:string = await page.locator('#demo').innerText();
    console.log("Prompt message: " + text);
    await expect(page.locator('#demo')).toContainText('Joe Blogs');
    
})