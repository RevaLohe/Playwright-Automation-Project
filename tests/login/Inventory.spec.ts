
import { test } from '../../fixtures/HooksFixtures.spec';
import { LoginPage } from '../../pages/Login.spec'
import { users } from '../../test-data/users.spec';
import { Inventory } from '../../pages/Inventory.spec';

test.describe("Inventory (Products listing) module", () => {


    test("Products page loads after login (title/header visible) @smoke", async ({ loginLogoutFixture,page }) => {
        const inventoryPage = new Inventory(page);
        await inventoryPage.assertProductPageLoaded();
    })

})