import { expect, Locator, Page, selectors } from "@playwright/test";
import { testIds } from "../selectors/allselectors.ts";


export class Inventory {

    private readonly page: Page;
    private readonly pageTitle: Locator;
    private readonly inventoryItems: Locator;
    private readonly cartBadge: Locator;
    private readonly cartIcon: Locator;
    private readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.locator(testIds.pageTitle);
        this.inventoryItems = page.locator(testIds.inventoryItems);
        this.cartBadge = page.locator(testIds.cartBadge);
        this.cartIcon = page.locator(testIds.cartIcon);
        this.sortDropdown = page.locator(testIds.sortDropdown);
    }

    async getCartItemCount(): Promise<Number> {
        if (await this.cartBadge.isVisible()) {
            const count = await this.cartBadge.innerText();
            return Number(count);
        }
        return 0;
    }

    async assertProductPageLoaded(){
        expect(this.page).toHaveURL(/inventory/)
        expect(this.pageTitle).toBeVisible();
        expect(this.pageTitle).toHaveText("Products")
    }
}