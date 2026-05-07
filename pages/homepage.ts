import {Locator, Page, expect} from '@playwright/test';

export class Homepage{
    private welcomeMessage:Locator;

    constructor(page:Page){
        this.welcomeMessage=page.locator('#welcomeUser');

    }

    async verifyWelcomeMessage(){
        await expect(this.welcomeMessage).toHaveText('Welcome to SenthilSmartQAHub')
    }
};