import {test, expect, Locator, Page} from '@playwright/test';
import { clear } from 'node:console';

async function selectDate(targetYear: string, targetMonth: string, targetDay: string, page:Page, isFuture:boolean){
    //My Way
    /*while(true){
        const calendarMonth = await page.locator(".ui-datepicker-month").textContent();
        console.log(calendarMonth);
        const calendarYear = await page.locator(".ui-datepicker-year").innerText();
        console.log(calendarYear);
        const nextButton = await page.locator(".ui-datepicker-next");
        if(calendarMonth?.toLowerCase().includes(month.toLowerCase())){
            if(calendarYear === year){
                //click on the date and set while to false
                console.log("Now select the Date")
                const daySelector = await page.locator(".ui-datepicker-calendar td a", {hasText: day});
                await daySelector.click();
                break;
            }
            else{
                await nextButton.click();
            }
        }
        else{
            await nextButton.click();
        }
    }*/

    while(true){
        const calendarMonth = await page.locator(".ui-datepicker-month").innerText();
        const calendarYear = await page.locator(".ui-datepicker-year").innerText();
        const nextButton = await page.locator(".ui-datepicker-next");
        const prevButton = await page.locator(".ui-datepicker-prev");

        if(calendarMonth?.toLowerCase().includes(targetMonth.toLowerCase()) && calendarYear===targetYear){
            break;
        }

        if(isFuture){
            //Future date
            await nextButton.click();
        }else{
            //Past
            await prevButton.click();
        }
        await page.waitForTimeout(1000);
    }

    const daySelector = await page.locator(".ui-datepicker-calendar td a", {hasText: targetDay});
    await daySelector.click();
}



test("JQuery date picker", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateField: Locator = await page.locator("#datepicker");
    await expect(dateField).toBeVisible();

    //Approach 1) Using fill
    //await dateField.fill("22/11/1993");

    //Approach 2) Selecting a date
    //Select target date without fill
    await dateField.click();
    const year: string = "2026";
    const month: string = "Nov";
    const day: string = "22";

    selectDate(year, month, day, page, true);
    const expectedDate="11/22/2026";

    await expect(dateField).toHaveValue(expectedDate, {timeout: 70000});
});