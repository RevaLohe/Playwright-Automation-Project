import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login';
import { users } from '../test-data/users';
import { Inventory } from '../pages/Inventory';
import { Cart } from '../pages/Cart';
import { CheckoutInfo } from '../pages/CheckoutInfo';
import { CheckoutOverview } from '../pages/CheckoutOverview';
import { CheckoutComplete } from '../pages/CheckoutComplete';
import { ProductDetail } from '../pages/ProductDetail';

type HooksFixtures = {
    loginLogoutFixture: LoginPage;
    inventoryFixture: Inventory;
    cartFixture: Cart;
    checkoutInfoFixture: CheckoutInfo;
    checkoutOverviewFixture: CheckoutOverview;
    checkoutCompleteFixture: CheckoutComplete;
    productDetailFixture: ProductDetail;
};

export const test = baseTest.extend<HooksFixtures>({

    loginLogoutFixture: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        //Login
        await loginPage.openPage();
        await loginPage.login(users.valid.username, users.valid.password);
        
        await use(loginPage);
    }, 

    inventoryFixture: async ({ page }, use) => {
        const inventoryPage = new Inventory(page);
        await use(inventoryPage);

    },

    cartFixture: async ({ page }, use) => {
        const cartPage = new Cart(page);
        await use(cartPage);

    },

    checkoutInfoFixture: async ({ page }, use) => {
        await use(new CheckoutInfo(page));
    },

    checkoutOverviewFixture: async ({ page }, use) => {
        await use(new CheckoutOverview(page));
    },

    checkoutCompleteFixture: async ({ page }, use) => {
        await use(new CheckoutComplete(page));
    },

    productDetailFixture: async ({ page }, use) => {
        await use(new ProductDetail(page));
    },
});

export { expect };
