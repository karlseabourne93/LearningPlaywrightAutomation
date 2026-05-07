import {test, expect, Locator} from '@playwright/test';

test("Pagination table example", async ({page}) =>{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    //These are used to check if more values are in the table
    let morePages = true;
    let moreRows = true;

    while(morePages){
        let rows = await page.locator("#example tbody tr").all();
        for(let row of rows){
            console.log(await row.innerText());
        }
        const nextButton = page.locator("button[aria-label='Next']");
        const isDisabled = await nextButton.getAttribute('class');

        if(isDisabled?.includes('disabled')){
            morePages = false;
        }
        else{
            nextButton.click();
            await page.waitForTimeout(1000);
        }
    }
});

test("Filter on the table", async ({page}) =>{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown: Locator = await page.locator("#dt-length-0");
    await dropdown.selectOption({label: '25'});

    //array version
    let rows = await page.locator("#example tbody tr").all();
    expect(rows.length).toBe(25);

    //locator versonion
    let rows2 = await page.locator("#example tbody tr");
    expect(rows2).toHaveCount(25);
});

test("Search for value in table", async ({page}) =>{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchBox:Locator = await page.locator("#dt-search-0");
    await searchBox.fill("Paul Byrd")

    let rows = await page.locator("#example tbody tr").all();

    if(rows.length>1){
        let matchFound = false;
        for(let row of rows){
            const text = await row.innerText();
            if(text.includes("Paul Byrd")){
                console.log("Match Found");
                matchFound = true;
                break;
            }
        }

    }
    else{
        console.log("NO Match Found");
    }

});