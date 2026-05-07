 /*
 Need to run "npm install csv-parse" so get packages 
 */
 import {test, expect} from '@playwright/test';
 //allows us to read external files
 import fs from 'fs';
 import {parse} from 'csv-parse/sync';

 //Apparently we have to specify the type of output from the csv later (despite tutorials not specifying this) and we do this with the below
 //We can omit this if we wanted to, check the block comment underneath
type LoginData = {
  email: string;
  password: string;
  validity: string;
};

 //Get the path of the csv file
const csvPath = 'tests/test-data/login.csv';
 //Read csv data and store it in a constant array as any type
const fileContent = fs.readFileSync(csvPath, 'utf-8');
const loginData = parse(fileContent, {columns:true, skip_empty_lines: true}) as LoginData[]; //And then we as "as LoginData[];" for syntax sake i beleive ¯_(ツ)_/¯
/* OR
We do the above like:
const loginData:any = parse(fileContent, {columns:true, skip_empty_lines: true}); 
*/
 
 test.describe('login data driven test', async () => {
     for(const data of loginData){
 
         test(`Login test ${data.email}`, async({page})=> { 
             await page.goto('https://demowebshop.tricentis.com/login');
 
             //fill login form
             await page.locator('#Email').fill(data.email)
             await page.locator('#Password').fill(data.password)
             await page.locator('input[value="Log in"]').click();
 
             if(data.validity.toLowerCase() === 'valid'){
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