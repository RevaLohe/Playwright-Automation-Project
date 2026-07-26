import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors";

export class CheckoutOverview {
    private readonly page: Page;
    private readonly pageTitle: Locator;
    private readonly cartItems: Locator;
    private readonly finishBtn: Locator;
    private readonly cancelBtn: Locator;
    private readonly subtotal: Locator;
    private readonly tax: Locator;
    private readonly total: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator(testIds.pageTitle);
        this.cartItems = page.locator(testIds.cartItems);
        this.finishBtn = page.locator(testIds.finishButton);
        this.cancelBtn = page.locator(testIds.cancelButton);
        this.subtotal = page.locator(testIds.subtotalLabel);
        this.tax = page.locator(testIds.taxLabel);
        this.total = page.locator(testIds.totalLabel);
    }

    async assertLoaded() {
        await expect(this.page).toHaveURL(/checkout-step-two\.html/);
        await expect(this.pageTitle).toHaveText("Checkout: Overview");
    }

    async assertItemPresent(name: string) {
        const item = this.cartItems.filter({
            has: this.page.locator(".inventory_item_name", { hasText: name }),
        });
        await expect(item).toHaveCount(1);
    }

    async assertItemCount(count: number) {
        await expect(this.cartItems).toHaveCount(count);
    }

    async assertTotalsVisible() {
        await expect(this.subtotal).toBeVisible();
        await expect(this.tax).toBeVisible();
        await expect(this.total).toBeVisible();
    }

    async finish() {
        await this.finishBtn.click();
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
    }

    async cancel() {
        await this.cancelBtn.click();
        await expect(this.page).toHaveURL(/inventory/);
    }
}
