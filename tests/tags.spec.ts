/* 
    Tagging is another form of grouping
    Tests are assigned tags, then tests can be executed depending on their tag.

    Test 1 - Sanity
    Test 2 - Sanity, Regression
    Test 1 - Regression

    Using tags we can just run the sanity tests or the regression tests

    To run only sanity, or any other, then run the terminal command:
    npx playwright test tags.spec.ts --grep "@sanity"

    To run only sanity and regression then we have to use regex and the command would be:
    npx playwright test tags.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"

    To run either sanity OR regression then we use this command:
    npx playwright test tags.spec.ts --grep "@sanity|@regression"

    To run sanity tests that do not have the regression tags:
    npx playwright test tags.spec.ts --grep-invert "@sanity"

    You can specify these tags by default in the config file underneath the test dir

*/

import {test, expect} from '@playwright/test';

//The @ in the test name is the tag
test('@sanity Test 1', async({page}) => {
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});

test('@sanity @regression Test 2', async({page}) => {
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});

//Or you can add tags this way too
test('Test 3', {tag: '@regression'}, async({page}) => {
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});

//Or multiple tags this way
test('Test 4', {tag:['@regression', '@sanity']}, async({page}) => {
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});
