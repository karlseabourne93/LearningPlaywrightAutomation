import {test} from '@playwright/test';

//We can change the config settings here just for this test. For example we can made tests run sequentially or parallel depending what we specify
//Configuring it below will only assign one working ad will run sequentially, 1 at a time
test.describe.configure({mode: 'serial'});

test.describe('Parallel Testing', async() =>{

    test('Test 1', sync()=>{
        console.log("Test 1");
    });

    test('Test 2', sync()=>{
        console.log("Test 1");
    });

    test('Test 3', sync()=>{
        console.log("Test 1");
    });

    test('Test 4', sync()=>{
        console.log("Test 1");
    });

    test('Test 5', sync()=>{
        console.log("Test 1");
    });
});