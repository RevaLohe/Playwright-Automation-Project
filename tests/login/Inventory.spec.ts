import { test } from '../../fixtures/HooksFixtures';
import { Inventory } from '../../pages/Inventory';

test.describe("Inventory (Products listing) module", () => {


    test("Products page loads after login (title/header visible) @smoke", async ({ loginLogoutFixture,page }) => {
        const inventoryPage = new Inventory(page);
        await inventoryPage.assertProductPageLoaded();
    })

})