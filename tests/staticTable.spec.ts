import {test, expect, Locator} from '@playwright/test';

test("static tables", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const staticTable:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(staticTable).toBeVisible();

    //1) count number of rows and columns
    const rows = staticTable.locator("tr");
    const columns = staticTable.locator("tr th");
    console.log('number of rows: ', await rows.count());
    console.log('number of columns: ', await columns.count());
    await expect(rows).toHaveCount(7);
    await expect(columns).toHaveCount(4);


    //Read all data from the second row
    const secondRow = staticTable.locator("tr").nth(1);
    console.log('data from the second row: ', await secondRow.textContent());
    //console.log('data from the second row with trim(): ', (await secondRow.textContent())?.trim());
    //console.log('data from the second row with innerText(): ', await secondRow.innerText());

    //Read all data from the third column
    const thirdColumn = staticTable.locator("tr td:nth-child(3)");
    const count = await thirdColumn.count();
    for(let i=0; i<count; i++){
        console.log('data from the third column: ', await thirdColumn.nth(i).textContent());
        //console.log('data from the third column with trim(): ', (await thirdColumn.nth(i).textContent())?.trim());
        //console.log('data from the third column with innerText(): ', await thirdColumn.nth(i).innerText());
    }

    //Read the data from the cell in the second row and third column
    const cellData = staticTable.locator("tr").nth(1).locator("td").nth(2);
    console.log('data from the cell in the second row and third column: ', await cellData.textContent());

    //Read the data from the cell in the last row and last column
    const lastCellData = staticTable.locator("tr").last().locator("td").last();
    console.log('data from the cell in the last row and last column: ', await lastCellData.textContent());

    //Read the data from the cell in the first row and first column
    const firstCellData = staticTable.locator("tr").first().locator("th").first();
    console.log('data from the cell in the first row and first column: ', await firstCellData.textContent());

    //read all the data from the table and store it in a 2D array
    //1)
    const tableData: string[][] = [];
    const rowCount = await rows.count();
    const columnCount = await columns.count();

    console.log('ALL ROW DATA 1: ');
    for(let i=1; i<rowCount; i++){
        const row: string[] = [];
        for(let j=0; j<columnCount; j++){
            const cellData = staticTable.locator("tr").nth(i).locator("td").nth(j);
            row.push((await cellData.textContent()) ?? '');
        }
        tableData.push(row);
    }
    console.log('table data: ', tableData);

    console.log('\n\n\n\n');

    //2) using evaluateAll() method to read all the data from the table and store it in a 2D array
    const tableData2 = await staticTable.locator('tr').evaluateAll(rows => rows.map(row => Array.from(row.querySelectorAll('td')).map(cell => cell.textContent?.trim() ?? '')));
    console.log('table data: ', tableData2);

    console.log('\n\n\n\n');

    //3)
    const allRowData=await rows.all();
    for(let row of allRowData.slice(1)){
        const rowData = await row.locator('td').allInnerTexts();
        console.log(rowData.join('\t'))
    }

});