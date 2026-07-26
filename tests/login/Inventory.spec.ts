import { test } from '../../fixtures/HooksFixtures';

test.describe("Inventory (Products listing) module", () => {

    test("Products page loads after login (title/header visible) @smoke", async ({ loginLogoutFixture, inventoryFixture }) => {
        await inventoryFixture.assertProductPageLoaded();
    })

    test("Catalog shows 6 products and Backpack price @smoke", async ({ loginLogoutFixture, inventoryFixture }) => {
        await inventoryFixture.assertProductCount(6);
        await inventoryFixture.assertItemPrice("Sauce Labs Backpack", "$29.99");
    })

    test("Sort by name Z to A @regression", async ({ loginLogoutFixture, inventoryFixture }) => {
        await inventoryFixture.sortBy("za");
        await inventoryFixture.assertFirstItemName("Test.allTheThings() T-Shirt (Red)");
    })

    test("Sort by price low to high @regression", async ({ loginLogoutFixture, inventoryFixture }) => {
        await inventoryFixture.sortBy("lohi");
        await inventoryFixture.assertFirstItemName("Sauce Labs Onesie");
        await inventoryFixture.assertFirstItemPrice("$7.99");
    })

    test("Sort by price high to low @regression", async ({ loginLogoutFixture, inventoryFixture }) => {
        await inventoryFixture.sortBy("hilo");
        await inventoryFixture.assertFirstItemName("Sauce Labs Fleece Jacket");
        await inventoryFixture.assertFirstItemPrice("$49.99");
    })

    test("Product detail page add to cart then back @smoke", async ({
        loginLogoutFixture,
        inventoryFixture,
        productDetailFixture,
    }) => {
        await inventoryFixture.openProductByName("Sauce Labs Backpack");
        await productDetailFixture.assertLoaded("Sauce Labs Backpack");
        await productDetailFixture.assertPrice("$29.99");
        await productDetailFixture.addToCart();
        await inventoryFixture.assertCartBadgeCount(1);
        await productDetailFixture.backToProductsList();
        await inventoryFixture.assertProductPageLoaded();
        await inventoryFixture.assertCartBadgeCount(1);
    })

    test("Reset App State clears cart badge @regression", async ({
        loginLogoutFixture,
        inventoryFixture,
    }) => {
        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.addItemToTheCartByName("Sauce Labs Bike Light");
        await inventoryFixture.assertCartBadgeCount(2);

        await loginLogoutFixture.resetAppState();
        await inventoryFixture.assertCartBadgeHidden();
    })
})
