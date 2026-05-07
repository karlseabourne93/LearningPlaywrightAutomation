import {test, expect} from '@playwright/test';

//in the config file 'fullyParallel: true' is default. This will run tests in paralel so test 1 might be run then test 4 might be run. There is no order
//If we want them run sequntially then we turn this value to 'false'


//We can group these together
test.describe('Group 1', async() => {
    test('test 1', async ({page}) => {
        console.log('Test 1 ...');

    });

    test('test 2', async ({page}) => {
        console.log('Test 2 ...');

    });
});


test.describe('Group 2', async() => {
    test('test 3', async ({page}) => {
        console.log('Test 3 ...');

    });

    test('test 4', async ({page}) => {
        console.log('Test 4 ...');

    });
})

//To execute just one group, in the command line add '--grep 'Group 1''
//npx playwright test tests/grouping.spec.ts --grep 'Group 1' --headed