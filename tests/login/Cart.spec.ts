import { test } from '../../fixtures/HooksFixtures.spec'

test.describe("Cart Test", () => {

    test("Add 1 item -> badge updates -> cart contains item", async ({ loginLogoutFixture, inventoryFixture, cartFixutre, page }) => {

        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.openCart();
        await inventoryFixture.assertCartBadgeCount(1);

        await cartFixutre.assertItemPresent("Sauce Labs Backpack");
        await cartFixutre.assertQuantity("Sauce Labs Backpack", "1");
    })

    test("Add 2 items -> badge 2 -> remove 1 in cart -> badge becomes 1", async ({ loginLogoutFixture, inventoryFixture, cartFixutre, page  }) => {

        await inventoryFixture.addItemToTheCartByName("Sauce Labs Backpack");
        await inventoryFixture.addItemToTheCartByName("Sauce Labs Bike Light");
        await inventoryFixture.assertCartBadgeCount(2);

        await inventoryFixture.openCart();
        await cartFixutre.removeItem("Sauce Labs Bike Light");

        await cartFixutre.continueShopping();
        await inventoryFixture.assertCartBadgeCount(1);
    });


})