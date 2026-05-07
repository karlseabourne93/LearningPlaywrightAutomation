import {test, expect, Locator} from '@playwright/test';

test('single select dropdown', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //Create the locator for the dropdown
    const dropdown: Locator = page.getByRole('combobox', { name: 'country' });

    //SELECT AN OPTION FROM THE DROPDOWN
    //There are 4 ways to select an option from the dropdown
    //1. Select by text
    await dropdown.selectOption('India');
    //2. Select by value
    await dropdown.selectOption({value: "uk"});
    //3. Select by index
    await dropdown.selectOption({index: 9});
    //4. Select by label
    await dropdown.selectOption({label: 'United Kingdom'});




    //COUNT THE NUMBER OF OPTIONS IN THE DROPDOWN
    //Count the number of options in the dropdown and print it
    //This will return a locator for all the option elements in the dropdown
    //This is different from the next one because it will return a locator instead of an array of element handles, so we can use locator methods on it
    const OptionLength1 = dropdown.locator('option');
    console.log(`Number of options in the dropdown: ${await OptionLength1.count()}`);
    expect(OptionLength1).toHaveCount(10);
    expect(await OptionLength1.count()).toBe(10);

    //This will return an array of element handles for all the option elements in the dropdown
    //This is different from the previous one because it will return an array of element handles instead of a locator, so we can use array methods on it
    const optionLength2 = await dropdown.locator('option').all();
    console.log(`Number of options in the dropdown (locator array): ${optionLength2.length}`);
    expect(optionLength2.length).toBe(10);
    expect(optionLength2.length).toEqual(10);
    expect(optionLength2).toHaveLength(10);


    
    //ASSERT THE OPTIONS IN THE DROPDOWN
    //1. Now we need to assert that the options in the dropdown are correct, we can do this by getting the text of all the options and comparing it with an expected array of options
    const expectedOptions: string[] = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'China', 'Brazil', 'India'];
    const actualOptions: string[] = await dropdown.locator('option').allTextContents();
    console.log(`Actual options in the dropdown (pre trim): ${actualOptions}`);
    //Here we are trimming the actual options because there might be some extra spaces in the text content of the options, so we need to trim them before comparing with the expected options
    for (let i = 0; i < actualOptions.length; i++) {
        actualOptions[i] = actualOptions[i].trim();
    }
    console.log(`Actual options in the dropdown (post trim): ${actualOptions}`);
    //Here we are using the toEqual matcher to compare the actual options with the expected options, this will check if the two arrays have the same elements in the same order
    expect(actualOptions).toEqual(expectedOptions);


    //2. Here is another way to assert the options in the dropdown. This is different to the other example because we are using a loop to compare each option individually instead of comparing the whole array at once, this will give us more detailed information about which option is incorrect if the test fails
    //another way to assert the options in the dropdown is to get the text of each option and compare it with the expected options using a loop
    for (let i = 0; i < expectedOptions.length; i++) {
        const optionText = await dropdown.locator('option').nth(i).textContent();
        console.log(`Option ${i}: ${optionText}`);
        expect(optionText?.trim()).toBe(expectedOptions[i]);
    }

    //3. We can create a map on the locator array to trim the white spaces from the text content of the options and then compare it with the expected options using the toEqual matcher, this is a more concise way to do the same thing as the previous example
    //Mapping works by applying a function to each element of an array and returning a new array with the results, in this case we are applying the trim function to each text content of the options to remove any extra spaces before comparing with the expected options
    //PREFER this method over the previous one because it is more concise and easier to read, it also avoids the need for a loop and manual indexing, which can be error-prone and less efficient
    const actualOptionsMapped: string[] = (await dropdown.locator('option').allTextContents()).map(text => text.trim());
    console.log(`Options in the dropdown (post trim using map): ${actualOptionsMapped}`);
    expect(actualOptionsMapped).toEqual(expectedOptions);
});