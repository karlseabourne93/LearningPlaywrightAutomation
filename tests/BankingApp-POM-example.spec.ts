import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {Homepage} from '../pages/homepage';

//asyncronous test method, with the page fixture
test('login in', async({page}) =>{
    await page.goto('https://senthilsmartqahub.blogspot.com/2025/06/banking-application.html');

    //creating an object with for the LoginPage class
    const loginpage = new LoginPage(page)
    const homepage = new Homepage(page);
    await loginpage.doLogin('SenthilSmartQAHub', 'demo');
    homepage.verifyWelcomeMessage();

});