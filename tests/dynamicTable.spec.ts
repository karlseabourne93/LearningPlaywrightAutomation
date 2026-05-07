import {test, expect, Locator} from '@playwright/test';

test("Dynamic Tables", async ({page}) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    //create the locators
    const table:Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();

    //Step 1. get CPU load of the chrome process
    //Read each row to check chrome presence
    //first, find number of rows first by selecting all rows and looping through

    const rows:Locator[] = await table.locator("tr").all();
    console.log("Number of rows: " + rows.length);
    let cpuCSS:string = "";
    let cpuPlaywright:string;
    for(const row of rows){
        const processName:string = await row.locator("td").nth(0).innerText();
        if(processName === "Chrome"){
            //This is using a CSS selector to find the cell
            cpuCSS = await row.locator("td:has-text('%')").innerText();
            console.log("The CPU for Chrome (CSS) is: " + cpuCSS);

            //This is using a playwright specific selector
            cpuPlaywright = await row.locator("td", {hasText: "%"}).innerText();
            console.log("The CPU for Chrome (Playwright) is: " + cpuCSS);

            break;
        }
    }
    //Step 2. compare it with the yellow label value
    const cpuLoad:string = (await page.locator("#chrome-cpu").innerText());
    console.log(cpuLoad);
    //comaprison 1
    expect(cpuLoad).toContain(cpuCSS);
    //comparison 2
    const cpuLoadTrim = cpuLoad.slice(12);
    expect(cpuCSS === cpuLoad);
    
});