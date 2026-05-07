import {test, expect, Locator} from '@playwright/test';

test("booking.com bootstrap datepaicker", async ({page}) =>{
    await page.goto("https://www.booking.com/");

    //Decline cookies
    const cookieDecline: Locator = await page.getByRole('button', {name: 'Decline'});
    await cookieDecline.click();

    //close promotions popup
    const signInClose: Locator = await page.getByRole('dialog').locator('.de576f5064.b46cd7aad7.e26a59bb37.c295306d66.c7a901b0e7');
    await signInClose.click();

    //Click on datepicker field
    await page.getByTestId('searchbox-dates-container').click();

    //====Check in date selection====
    let checkInYear: string = "2026";
    let checkInMonth: string = "November";
    let checkInDay: string = "22";

    //Navigate through the calendar to find the desired month and year
    while(true){
        const checkInMonthYear = await page.locator("h3.e7addce19e.af236b7586").nth(0).innerText();
        const currentMonth = checkInMonthYear.split(" ")[0];
        const currentYear = checkInMonthYear.split(" ")[1];

        if(currentMonth===checkInMonth && currentYear===checkInYear){
            break;
        }else{
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    //Select the specific check-in date
    let allDates = await page.locator("table.b8fcb0c66a tbody").nth(0).locator("td").all();
    let checkInDateSelected = false;

    for(let date of allDates){
        const dateText = await date.innerText();
        if (dateText===checkInDay){
            await date.click()
            checkInDateSelected=true;
            break;
        }
    }

    //assert that the check in date has been selected
    expect(checkInDateSelected).toBeTruthy();

    //===Check Out Date===
    let checkOutYear: string = "2026";
    let checkOutMonth: string = "November";
    let checkOutDay: string = "27";

    //Navigate to the correct check out date
    let whichCal;
    while(true){
        const checkInMonthYear = await page.locator("h3.e7addce19e.af236b7586").nth(0).innerText();
        const currentMonth = checkInMonthYear.split(" ")[0];
        const currentYear = checkInMonthYear.split(" ")[1];
        const checkInMonthYear2 = await page.locator("h3.e7addce19e.af236b7586").nth(1).innerText();
        const currentMonth2 = checkInMonthYear.split(" ")[0];
        const currentYear2 = checkInMonthYear.split(" ")[1];

        if(currentMonth===checkOutMonth && currentYear===checkOutYear){
            whichCal = 0;
            break;
        }else if(currentMonth2===checkOutMonth && currentYear2===checkOutYear){
            whichCal = 1;
            break;
        }else{
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    allDates = await page.locator("table.b8fcb0c66a tbody").nth(whichCal).locator("td").all();
    let checkOutDateSelected = false;

    for(let date of allDates){
        const dateText = await date.innerText();
        if (dateText===checkOutDay){
            await date.click()
            checkOutDateSelected=true;
            break;
        }
    }
    expect(checkOutDateSelected).toBeTruthy();



});