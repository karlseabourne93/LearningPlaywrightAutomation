import {test, expect, Locator} from '@playwright/test';

    /*2 types of CSS Locators: Relative and Absolute
    Absolute CSS locator - html > body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)
    Relative CSS locator - img[alt='Tricentis Demo Web Shop']

     tag with id - tag#idValue or #idValue
     tag with class - tag.classValue or .classValue
     tag with attribute - tag[attribute='value'] or [attribute='value']
     tag with multiple classes - tag.class1.class2 or .class1.class2
     tag with multiple attributes - tag[attribute1='value'][attribute2='value'] or [attribute1='value'][attribute2='value']
     tag with attribute containing value - tag[attribute*='value'] or [attribute*='value']
     tag with attribute starting with value - tag[attribute^='value'] or [attribute^='value']
     tag with attribute ending with value - tag[attribute$='value'] or [attribute$='value']
     tag with class and attribute - tag.classValue[attribute='value'] or .classValue[attribute='value']
     nth-child - parent > child:nth-child(n) or parent > :nth-child(n)
     first-child - parent > child:first-child or parent > :first-child
     last-child - parent > child:last-child or parent > :last-child
     only-child - parent > child:only-child or parent > :only-child
    */

test('CSS locator example', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');

    //tag#id
    //const searchBox:Locator = page.locator("input#small-searchterms");
    const searchBoxID:Locator = page.locator("#small-searchterms");
    await searchBoxID.fill("laptop");

    //tag.class
    //const searchBox:Locator = page.locator("input.search-box-text");
    const searchBoxClass:Locator = page.locator(".search-box-text");
    await searchBoxClass.fill("laptop");

    //tag[attribute='value']
    //const searchBox:Locator = page.locator("input[name='q']");
    const searchBoxAttribute:Locator = page.locator("[name='q']");
    await searchBoxAttribute.fill("laptop");

    //tag with multiple classes
    //const searchBox:Locator = page.locator("input.search-box-text.ui-autocomplete-input");
    const searchBoxMultipleClasses:Locator = page.locator(".search-box-text.ui-autocomplete-input");
    await searchBoxMultipleClasses.fill("laptop");

    //tag with multiple attributes
    //const searchBox:Locator = page.locator("input[name='q'][type='text']");
    const searchBoxMultipleAttributes:Locator = page.locator("[name='q'][type='text']");
    await searchBoxMultipleAttributes.fill("laptop");

    //tag with attribute containing value
    //const searchBox:Locator = page.locator("input[name*='search']");
    const searchBoxAttributeContainingValue:Locator = page.locator("[value*='Search ']");
    await searchBoxAttributeContainingValue.fill("laptop");

    //tag with attribute starting with value
    //const searchBox:Locator = page.locator("input[name^='s']");
    const searchBoxAttributeStartingWithValue:Locator = page.locator("[id^='small']");
    await searchBoxAttributeStartingWithValue.fill("laptop");

    //tag with attribute ending with value
    //const searchBox:Locator = page.locator("input[name$='terms']");
    const searchBoxAttributeEndingWithValue:Locator = page.locator("[id$='searchterms']");
    await searchBoxAttributeEndingWithValue.fill("laptop");

    //tag with class and attribute
    //const searchBox:Locator = page.locator("input.search-box-text[name='q']");
    const searchBoxClassAndAttribute:Locator = page.locator(".search-box-text[name='q']");
    await searchBoxClassAndAttribute.fill("laptop");


});