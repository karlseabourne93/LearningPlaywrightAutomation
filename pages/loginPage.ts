import {Locator, Page} from '@playwright/test';

export class LoginPage {

    private usernameTextbox: Locator;  //We use private here so the locator cannot be accessed outside of the LoginPage class - makes it more secure
    private passwordTextbox: Locator;
    private loginButton:Locator;

    constructor (page:Page){
        this.usernameTextbox=page.getByPlaceholder('Enter your username');
        this.passwordTextbox=page.getByPlaceholder('Enter your password');
        this.loginButton=page.getByText('Login').nth(1);
    }

    async doLogin(username:string, password:string){
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }
};