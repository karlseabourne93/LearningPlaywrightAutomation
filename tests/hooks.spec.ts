import {test, expect} from '@playwright/test';

//Hooks can be used to reuse code in tests that share the same steps
//For example we can use beforeEach and afterEach to log in and then Log out
//(recommend turning fully parallel off for this demo so it is easier to see in the logs)

test.beforeAll('Before All', async () => {
    console.log('This is Before All');
})

test.beforeEach('Log in before each test', async () =>{
    //Log in here
    console.log('This is Before Each');
});

test.afterEach('After Each', async() =>{
    //eg Log out
    console.log('This is After Each')
})

test.afterAll('After All', async () => {
    console.log('This is After All');
});

test('test 1', async () => {
    console.log('Test 1 ...');

});

test('test 2', async () => {
    console.log('Test 2 ...');

});


test('test 3', async () => {
    console.log('Test 3 ...');

});

test('test 4', async () => {
    console.log('Test 4 ...');

});