 import {test, expect} from '@playwright/test';
 //allows us to read external files
 import fs from 'fs';

 //Get the path of the json file
 const jsonPath = "tests/test-data/login.json";
 //Read JSON data and store it in a constant array as any type
 const loginData:any[]= JSON.parse(fs.readFileSync(jsonPath, 'utf-8')); //utf = unicode transformation format

 
 test.describe('login data driven test', async () => {
     for(const {email, password, validity} of loginData){
 
         test(`Login test ${email}`, async({page})=> {
             await page.goto('https://demowebshop.tricentis.com/login');
 
             //fill login form
             await page.locator('#Email').fill(email)
             await page.locator('#Password').fill(password)
             await page.locator('input[value="Log in"]').click();
 
             if(validity.toLowerCase() === 'valid'){
                 const logoutLink = page.locator('a[href="/logout"]');
                 await expect(logoutLink).toBeVisible({timeout: 5000});
             } else{
                 const errorMessage = page.locator('.validation-summary-errors');
                 await expect(errorMessage).toBeVisible({timeout: 5000});
 
                 await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
 
             }
         });
     };
 });