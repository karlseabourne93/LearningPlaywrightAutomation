import {test, expect, Locator, Frame} from '@playwright/test';

test("Frames demo", async ({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    //total number of frames on the webpage
    const frames: Frame[] = await page.frames();
    console.log("Number of frames: " + frames.length);

    //====Approach 1 - using page.frame();====
    //Can only use name or url of the frame to locate it
    const frame1 = page.frame({url: "https://ui.vision/demo/webtest/frames/frame_1.html"});

    await frame1?.getByRole('textbox').fill("Hello");
    await page.waitForTimeout(3000);

    
    /*if(frame1){
        await frame1?.locator('[name="mytext1"]').fill("Hello");
        await page.waitForTimeout(3000);
    }*/

    //===Approach 2 - using framLocator()====
    //Can use all locators such as url, name, css, playwright etc.
    const frameCSS = page.frameLocator("[src='frame_1.html']").getByRole('textbox');
    await frameCSS.fill("Hello");

});

//Sometimes there are embedded frames inside frames, these are called inline frames (iFrames).
//To manipulate these we will be using frame.childFrames()
test("inner frames", async ({page}) =>{
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3 = await page.frame({url: "https://ui.vision/demo/webtest/frames/frame_3.html"});
    await frame3?.getByRole('textbox').fill("Hello");
    //We get the childframes as an array and then store them into a variable
    const childFrames = frame3?.childFrames();
    console.log("Child frames inside frame3: " + childFrames?.length);
    //We then access these childframes using the index of the one we want - we put this in an if statement as frame3 could be null which is why we have been using ?. we either put the if statment here or further above when handling frame3 eg. if(frame3){//code goes here} else{console.log("frame is null")}
    if(childFrames){
        const radio = await childFrames[0].getByLabel("I am a human");
        radio.check();
        await expect(radio).toBeChecked();
    }
})