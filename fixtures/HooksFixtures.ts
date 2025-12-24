import{test as baseTest,expect} from '@playwright/test'
import { LoginPage } from '../pages/Login'
import { users } from '../test-data/users'
import { Inventory } from '../pages/Inventory'
import { Cart } from '../pages/Cart'

type HooksFixtures={
    loginLogoutFixture: LoginPage,
    inventoryFixture: Inventory,
    cartFixutre: Cart
}

export const test = baseTest.extend<HooksFixtures>({

    loginLogoutFixture: async ({page}, use)=>{

        const loginPage = new LoginPage(page);

        //Login
        await loginPage.openPage();
        await loginPage.login(users.valid.username, users.valid.password);
        
        await use(loginPage);
    }, 

    inventoryFixture: async({page},use)=>{
        const inventoryPage = new Inventory(page);
        await use(inventoryPage);

    },

    cartFixutre: async({page},use)=>{
        const cartPage = new Cart(page);
        await use(cartPage);

    }
});

export { expect};
