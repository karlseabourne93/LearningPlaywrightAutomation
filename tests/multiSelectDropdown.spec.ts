import {test, expect, Locator} from '@playwright/test';

test('Multiple select dropdown', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //create the locators
    const colourList: Locator = page.getByRole('listbox', { name: 'colors' });
    expect(colourList).toBeVisible();

    //Select multiple options from the dropdown
    //1. Select by text
    await colourList.selectOption(['Red', 'Green']);
    //2. Select by value
    await colourList.selectOption([{value: 'yellow'}, {value: 'red'}]);
    //3. Select by index
    await colourList.selectOption([{index: 0}, {index: 3}]);
    //4. Select by label
    await colourList.selectOption([{label: 'Blue'}, {label: 'Green'}]);

    //Check an option is contained in the dropdown
    await expect(colourList.locator('option', { hasText: 'Yellow' })).toBeVisible();
    await expect(colourList.locator('option', { hasText: 'Pink' })).not.toBeVisible();
    //Or store the options in an array and use the toContain matcher to check if a specific option is present in the dropdown

    //count the number of options in the dropdown
    const optionCount = await colourList.locator('option').count();
    console.log(`Number of options in the dropdown: ${optionCount}`);
    expect(optionCount).toBe(7);

    //Check a specific option is present in the dropdown
    const optionText = await colourList.locator('option').nth(2).textContent();
    console.log(`Option at index 2: ${optionText}`);
    expect(optionText?.trim()).toBe('Green');

    const optionText2: string[] = (await colourList.locator('option').allTextContents()).map(text => text.trim());
    console.log(`Options in the dropdown: ${optionText2}`);
    expect(optionText2).toContain('Red');


    //print the options in the dropdown
    for (const option of optionText2) {
        console.log(`Option: ${option}`);
    }

});