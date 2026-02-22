
import { test , expect} from '../../fixtures/HooksFixtures'

test.describe("Cart Test", () => {

    test("Add 1 item -> badge updates -> cart contains item", async ({ loginLogoutFixture, inventoryFixture, cartFixture, page }) => {

        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.openCart();
        await inventoryFixture.assertCartBadgeCount(1);

        await cartFixture.assertItemPresent("Sauce Labs Backpack");
        await cartFixture.assertQuantity("Sauce Labs Backpack", "1");
    })

    test("Add 2 items -> badge 2 -> remove 1 in cart -> badge becomes 1", async ({ loginLogoutFixture, inventoryFixture, cartFixture, page }) => {

        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.addItemToTheCartByName("Sauce Labs Bike Light");
        await inventoryFixture.assertCartBadgeCount(2);

        await inventoryFixture.openCart();
        await cartFixture.removeItem("Sauce Labs Bike Light");

        await cartFixture.continueShopping();
        await inventoryFixture.assertCartBadgeCount(1);
    });

    test("Remove only item from inventory -> badge disappears", async ({ loginLogoutFixture, inventoryFixture, cartFixture, page }) => {

        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.assertCartBadgeCount(1);

        await inventoryFixture.removeItemFromCartByName("Sauce Labs Backpack");
        await inventoryFixture.assertCartBadgeHidden();
    });

    test("Continue shopping keeps cart state", async ({ loginLogoutFixture, inventoryFixture, cartFixture, page }) => {

        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.openCart();

        await cartFixture.assertItemPresent("Sauce Labs Backpack");
        await cartFixture.continueShopping();

        await inventoryFixture.assertCartBadgeCount(1);
    });

    test("Cart -> Checkout navigates to checkout step one", async ({ loginLogoutFixture, inventoryFixture, cartFixture, page }) => {

        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.openCart();

        await cartFixture.goToCheckout();
        await expect(page.locator(".title")).toHaveText("Checkout: Your Information");
    });


})