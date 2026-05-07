import {test, expect, Locator} from '@playwright/test';

test('hidden bootstrap dropdown', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('PIM').click();

    await page.waitForTimeout(1000);

    //click on title dropdown
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);

    //capture all the options in the dropdown
    const dropdownOptions: Locator = page.locator('div[role="listbox"] span');
    const optionsCount:number = await dropdownOptions.count();
    console.log('Number of dropdown options: ' + optionsCount);


    //print all the options
    for(let i=0; i<optionsCount; i++){
        console.log('Option ' + (i+1) + ': ' + await dropdownOptions.nth(i).innerText());
    }

    for(let i=0; i<optionsCount; i++){
        if((await dropdownOptions.nth(i).innerText()).toLocaleLowerCase() === 'automaton tester'){
            await dropdownOptions.nth(i).click();
            break;
        }else{
            //Throw an error if the option is not found in the dropdown
            if(i === optionsCount-1){
                throw new Error('Option "Automaton Tester" not found in the dropdown');
            }
        }
    }
    await page.waitForTimeout(5000);
});