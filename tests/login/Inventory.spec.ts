import { test } from '@playwright/test'
import { LoginPage } from '../../pages/Login.spec'
import { users } from '../../test-data/users.spec';
import { Inventory } from '../../pages/Inventory.spec';

test.describe("Inventory (Products listing) module", () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openPage();
        await loginPage.login(users.valid.username, users.valid.password);
    })

    test("Products page loads after login (title/header visible) @smoke", async ({ page }) => {

        const inventoryPage = new Inventory(page);
        await inventoryPage.assertProductPageLoaded();

    })

})