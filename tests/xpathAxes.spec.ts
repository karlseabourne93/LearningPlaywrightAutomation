import {test, expect, Locator} from '@playwright/test';

test('Xpath axes example', async ({ page }) => {
    await page.goto('https://www.w3schools.com/html/html_tables.asp');

    //1. Self Axis
    const germanyCell:Locator = page.locator("//td[text()='Germany']/self::td");
    console.log(await germanyCell.textContent());
    await expect(germanyCell).toHaveText('Germany');

    //2. Parent Axis
    const parentRow:Locator = page.locator("//td[text()='Germany']/parent::tr");
    console.log(await parentRow.textContent());
    await expect(parentRow).toContainText('Maria Anders');

    //3.Child Axis
    const childCells:Locator = page.locator("//table[@id='customers']//tr[2]/child::td")
    for (let i = 0; i < await childCells.count(); i++) {
        console.log("Child cells content " + i + ": " + await childCells.nth(i).textContent());
    }
    expect(await childCells.count()).toBe(3);

    //4. Ancestor Axis
    const ancestorTable:Locator = page.locator("//td[text()='Germany']/ancestor::table");
    console.log(await ancestorTable.getAttribute('id'));
    await expect(ancestorTable).toHaveAttribute('id', 'customers');

    //5. descendant Axis
    const descendantCells:Locator = page.locator("//table[@id='customers']/descendant::td");
    console.log("Total descendant td elements: " + await descendantCells.count());
    expect(await descendantCells.count()).toBe(18);
    
    //6. Following Axis
    const followingCells:Locator = page.locator("//td[normalize-space()='Germany']/following::td[1]");
    console.log("Total following td elements: " + await followingCells.count());
    await expect(followingCells).toHaveText("Centro comercial Moctezuma");

    //7. Following-sibling Axis
    const followingSiblingCells:Locator = page.locator("//td[normalize-space()='Maria Anders']/following-sibling::td");
    console.log("Total following sibling td elements: " + await followingSiblingCells.count() + ", and the first one is: " + await followingSiblingCells.first().textContent());
    await expect(followingSiblingCells.first()).toHaveText("Germany");

    //8. Preceding Axis
    const precedingCells:Locator = page.locator("//td[text()='Germany']/preceding::td[1]");
    console.log("Total preceding td elements: " + await precedingCells.count() + ", and the first one is: " + await precedingCells.first().textContent());
    await expect(precedingCells).toHaveText("Maria Anders");

    //9. Preceding-sibling Axis
    const precedingSiblingCells:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    console.log("Total preceding sibling td elements: " + await precedingSiblingCells.count() + ", and the first one is: " + await precedingSiblingCells.first().textContent());
    await expect(precedingSiblingCells.first()).toHaveText("Alfreds Futterkiste");
});