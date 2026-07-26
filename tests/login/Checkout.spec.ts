import { test, expect } from '../../fixtures/HooksFixtures';

test.describe("Checkout", () => {

    test("Complete checkout happy path @smoke", async ({
        loginLogoutFixture,
        inventoryFixture,
        cartFixture,
        checkoutInfoFixture,
        checkoutOverviewFixture,
        checkoutCompleteFixture,
    }) => {
        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.openCart();
        await cartFixture.goToCheckout();

        await checkoutInfoFixture.assertLoaded();
        await checkoutInfoFixture.fillInfo("Jane", "Doe", "2000");
        await checkoutInfoFixture.continue();

        await checkoutOverviewFixture.assertLoaded();
        await checkoutOverviewFixture.assertItemPresent("Sauce Labs Backpack");
        await checkoutOverviewFixture.assertTotalsVisible();
        await checkoutOverviewFixture.finish();

        await checkoutCompleteFixture.assertLoaded();
        await checkoutCompleteFixture.backHome();
        await inventoryFixture.assertProductPageLoaded();
        await inventoryFixture.assertCartBadgeHidden();
    });

    test("Checkout form shows error when fields are empty @regression", async ({
        loginLogoutFixture,
        inventoryFixture,
        cartFixture,
        checkoutInfoFixture,
    }) => {
        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.openCart();
        await cartFixture.goToCheckout();

        await checkoutInfoFixture.continueExpectingError();
        await checkoutInfoFixture.assertErrorContains(/First Name is required/i);
    });

    test("Cancel from checkout step one returns to cart", async ({
        loginLogoutFixture,
        inventoryFixture,
        cartFixture,
        checkoutInfoFixture,
    }) => {
        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.openCart();
        await cartFixture.goToCheckout();

        await checkoutInfoFixture.cancel();
        await cartFixture.assertItemPresent("Sauce Labs Backpack");
    });

    test("Empty cart checkout reaches overview with zero items", async ({
        loginLogoutFixture,
        inventoryFixture,
        cartFixture,
        checkoutInfoFixture,
        checkoutOverviewFixture,
        page,
    }) => {
        await inventoryFixture.openCart();
        await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
        await cartFixture.goToCheckout();

        await checkoutInfoFixture.fillInfo("Empty", "Cart", "0000");
        await checkoutInfoFixture.continue();

        await checkoutOverviewFixture.assertLoaded();
        await checkoutOverviewFixture.assertItemCount(0);
    });
});
