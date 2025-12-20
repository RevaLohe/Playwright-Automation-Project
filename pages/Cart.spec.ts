import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors.ts"

export class Cart {

    private page: Page;
    private readonly cartItem: Locator;
    private readonly continueShoppingBtn: Locator;
    private readonly checkoutBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.cartItem = page.locator(testIds.cartItems);
        this.continueShoppingBtn = page.locator(testIds.continueShoppingButton);
        this.checkoutBtn = page.locator(testIds.checkoutButton);
    }


    private cartItemByName(name: string): Locator {
        return this.cartItem.filter({
            has: this.page.locator(".inventory_item_name", { hasText: name }),
        });
    }

    async assertItemPresent(name: string) {
        await expect(this.cartItemByName(name)).toHaveCount(1);

    }
    async assertQuantity(name: string, qty: string = "1") {
        const item = this.cartItemByName(name);
        await expect(item.locator(".cart_quantity")).toHaveText(qty);
    }

    async removeItem(name: string) {
        const item = this.cartItemByName(name);
        await expect(item).toHaveCount(1);

        await item.locator("button:has-text('Remove')").click();
        await expect(item).toHaveCount(0);
    }

    async continueShopping() {
        await this.continueShoppingBtn.click();
        await expect(this.page).toHaveURL(/inventory/);
    }

    async goToCheckout() {
        await this.checkoutBtn.click();
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    }
}