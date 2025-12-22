import{test as baseTest} from '@playwright/test'
import { LoginPage } from '../pages/Login.spec'
import { users } from '../test-data/users.spec'
import { Inventory } from '../pages/Inventory.spec'
import { Cart } from '../pages/Cart.spec'

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
})
