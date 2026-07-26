import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors";

export class CheckoutComplete {
    private readonly page: Page;
    private readonly pageTitle: Locator;
    private readonly completeHeader: Locator;
    private readonly completeText: Locator;
    private readonly backHomeBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator(testIds.pageTitle);
        this.completeHeader = page.locator(testIds.completeHeader);
        this.completeText = page.locator(testIds.completeText);
        this.backHomeBtn = page.locator('[data-test="back-to-products"]');
    }

    async assertLoaded() {
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
        await expect(this.pageTitle).toHaveText("Checkout: Complete!");
        await expect(this.completeHeader).toHaveText("Thank you for your order!");
        await expect(this.completeText).toBeVisible();
    }

    async backHome() {
        await this.backHomeBtn.click();
        await expect(this.page).toHaveURL(/inventory/);
    }
}
