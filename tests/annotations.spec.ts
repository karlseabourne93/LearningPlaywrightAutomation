/* ==Types of annotations==
----------------------------
- only
- skip
- fail
- fixme
- slow
*/

import {test, expect} from '@playwright/test';

test('Test 1', async({page}) => {
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});

test('Test 2', async({page}) => {
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});

test('Test 3 - Skip', async({page, browserName}) => {
    test.skip(browserName === 'chromium', 'This test is skipped because browser is firefox');

    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});

//Used for flaky tests - expected to fail but passed
test.fail('Test 4 - fail', async({page}) => {
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});

//This will skip the test as it still needs some work on it
test.fixme('Test 5 - fix me', async({page}) => {
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});

//slow will triple the default timeout. Default is 30 seconds 
test('Test 6 - slow', async({page}) => {
    test.slow();
    await page.goto('https://www.google.com');
    expect(page).toHaveTitle('Google');
});