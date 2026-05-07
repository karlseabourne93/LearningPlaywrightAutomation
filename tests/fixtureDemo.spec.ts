import {test} from '../fixtures/fixture';

test('fixture test', async({navigation}) =>{
    
    console.log('The Fixture navigated to the website!');
    await navigation.waitForTimeout(1000);
});