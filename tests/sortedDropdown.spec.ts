import {test, expect, Locator} from '@playwright/test';

test('Sorted select dropdown', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    
    //create the locators
    const animalList: Locator = page.getByRole('listbox', { name: 'Sorted List' });
    expect(animalList).toBeVisible();

    //Get the options in the dropdown and store them in an array
    const optionsText: string[] = (await animalList.locator('option').allTextContents()).map(text => text.trim());

    //Check if the options are sorted in alphabetical order by comparing the original list with a sorted version of the list
    //We have to use a spread operator to create a copy of the original list before sorting it, otherwise we would be sorting the original list and the comparison would always return true
    //This is because the sort() method is muatable and it modifies the original array, so we need to create a copy of the original array before sorting it to preserve the original order for comparison
    const originalList: string[] = [...optionsText];
    const sortedList: string[] = [...optionsText].sort();

    console.log(`Original list: ${originalList}`);
    console.log(`Sorted list: ${sortedList}`);

});