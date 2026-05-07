import {test, expect} from '@playwright/test';

//can be set in cinfig file in the use method
//trace: 'on-first-retry',
//the file will be saved in the test results in a zip file
//when you open the trace file from the report it will open the trace viewer
//it test legitimately fails then share trace file with developer
//create tracing.spec.ts to test this

//tracing is normally set as global config but can be test specific when running tests themselves
//'npx playwright test test.spec.ts --trace on'

//can be written into the test itself (this will fail if tracing is enabled in the config file)
//we need to import the context to do this
test('trace example', async ({page, context}) => {
    //create trackng and import what we need (screenshot and snapshot
    context.tracing.start({screenshots: true, snapshots: true});

    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', {name: 'Computers'}).first().click();

    //We then close the tracer and export to a zip file
    //This means that we cannot view the trace file in the html report
    context.tracing.stop({path: 'fileName.zip'});

    //to view this file we open with the trace view in the comman prompt
    //'npx playwright show-trace fileName.zip'


    //OR

    //we can go to trace.playwight.dev and then drag and drop the trace file into there
});