import {test, expect, Locator} from '@playwright/test';

test('Text input actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //Get the element using a playwright specific locator
    const nameInput:Locator = page.getByPlaceholder('Enter Name');

    //check if the element is visible and enabled before performing actions on it
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEnabled();

    //Get an attribute of a field
    const nameInputAttribute:string | null = await nameInput.getAttribute('maxlength');
    console.log("Maxlength attribute value: " + nameInputAttribute);
    expect(nameInputAttribute).toBe('15');

    //Fill in text to the input field
    await nameInput.fill("John Doe");

    //Get the input value using the input's value attribute
    console.log("Input value using getInputValue: " + await nameInput.inputValue());
    expect(await nameInput.inputValue()).toBe("John Doe");

});

test('radio box actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //Get the element using a playwright specific locator
    const maleRadio:Locator = page.getByRole('radio', {name: "Male", exact: true});

    //Different ways to check if the radio button is checked or not
    //Check radio is not checked with isChecked() and .toBeFalsy()
    expect(await maleRadio.isChecked()).toBeFalsy();
    //Check radio is not checked using boolean values
    expect(await maleRadio.isChecked()).toBe(false);
    //Check radio is not checked using .not.toBeChecked() which is more readable and recommended
    await expect(maleRadio).not.toBeChecked();

    //check the radio button
    await maleRadio.check();

    //Check radio is checked (you can check values by using other methods like the above
    await expect(maleRadio).toBeChecked();

});

test.only('checkbox actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //Get the element using a playwright specific locator
    // Define an array of day labels
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Create an array of locators for the day checkboxes using a map function and the getByRole locator with the checkbox role and the day label as the name
    const dayCheckboxes: Locator[] = days.map(day => page.getByRole('checkbox', { name: day, exact: true }));

    //Check all the checkboxes using a loop and the check() method
    for (let checkbox of dayCheckboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        await page.waitForTimeout(500);

    }

    //uncheck last 3 checkboxes using a loop and the uncheck() method
    for (let checkbox of dayCheckboxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
        await page.waitForTimeout(500);
    }

    //A loop that unchecks all checked checkboxes and checks all unchecked checkboxes
    for (let checkbox of dayCheckboxes) {
        const isChecked = await checkbox.isChecked();
        if (isChecked) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
        await page.waitForTimeout(500);
    }
    /*
    //uncheck all checkboxes using a loop and the uncheck() method
    for (let checkbox of dayCheckboxes) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
        await page.waitForTimeout(500);

    }*/

    // Check Wednesday checkbox and verify it is checked
    await dayCheckboxes[3].check();
    await expect(dayCheckboxes[3]).toBeChecked();
    await page.waitForTimeout(1000);

    //Check Sunday, Monday and Tuesday in a loop
    for (let i of [0, 1, 2]) {
        await dayCheckboxes[i].check();
        await expect(dayCheckboxes[i]).toBeChecked();
        await page.waitForTimeout(500);
    }

    //Deselecting based off a label
    const dayToDeselect = 'Monday';
    const indexToDeselect = days.indexOf(dayToDeselect);
    if (indexToDeselect !== -1) {
        await dayCheckboxes[indexToDeselect].uncheck();
        await expect(dayCheckboxes[indexToDeselect]).not.toBeChecked();
    }

});