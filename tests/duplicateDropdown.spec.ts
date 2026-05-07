import {test, expect, Locator} from '@playwright/test';

test('duplicates in dropdowns', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //Create the locator for the dropdown
    const colourList: Locator = page.getByRole('listbox', { name: 'colors' });
    const colourOptions: string[] = (await colourList.locator('option').allTextContents()).map(text => text.trim());

    //Check for duplicates in the dropdown options
    //This Set will only store unique values
    const uniqueOptions = new Set(colourOptions);
    //If the size of the Set is different from the length of the original array, it means there are duplicates and will store this as 'true'. 
    //If no duplicates are found, it will store 'false'.
    const hasDuplicates = uniqueOptions.size !== colourOptions.length;
    console.log(`Dropdown has duplicates: ${hasDuplicates}`);

    //store the duplicates in an array. we create an empty array called 'duplicates' to store the duplicate options. 
    //We loop through each option in the original array and check if it appears more than once using the filter method. 
    //If it does and it's not already in the duplicates array, we add it to the duplicates array. 
    //Finally, we log the duplicates found in the dropdown.
    //The filter(x => x === option) method creates a new array containing only the elements that are equal to the current option.
    const duplicates: string[] = [];
    for (const option of colourOptions) {
        if (colourOptions.filter(x => x === option).length > 1 && !duplicates.includes(option)) {
            duplicates.push(option);
        }
    }
    console.log(`Duplicates in the dropdown: ${duplicates}`);



    //ALTERNATIVELY
    //create an empty set
    const mySet = new Set<string>();
    const duplicates2: string[] = [];
    //The following loop iterates through each option in the colourOptions array. For each option, it checks if the option is already present in the mySet.
    for (const option of colourOptions){
        if(mySet.has(option)){
            duplicates2.push(option);
        } else {
            mySet.add(option);
        }
    }

});