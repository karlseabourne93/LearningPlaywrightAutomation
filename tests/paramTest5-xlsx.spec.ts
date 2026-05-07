 /*
 Need to run "npm install xlsx" so get packages 
 */
 import {test, expect} from '@playwright/test';
 //allows us to read external files
 import fs from 'fs';
 import * as XLSX from 'xlsx';


 //Get the path of the xlsx file
 const xlsxPath = 'tests/test-data/login.xlsx';
 //Read xlsx data and store it in a constant array as any type
 //file --> workbook --> sheets --> rows & columns // This is the structure of an xlsx
 const workbook = XLSX.readFile(xlsxPath);
 const sheetNames = workbook.SheetNames[0];
 const workSheet = workbook.Sheets[sheetNames];

 //convert into json
 const loginData:any=XLSX.utils.sheet_to_json(workSheet);


 
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