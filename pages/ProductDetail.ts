import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors";

export class ProductDetail {
    private readonly page: Page;
    private readonly name: Locator;
    private readonly description: Locator;
    private readonly price: Locator;
    private readonly backToProducts: Locator;
    private readonly addToCartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.locator(testIds.inventoryItemName);
        this.description = page.locator(testIds.inventoryItemDesc);
        this.price = page.locator(testIds.inventoryItemPrice);
        this.backToProducts = page.locator(testIds.backToProducts);
        this.addToCartBtn = page.locator('button:has-text("Add to cart")');
    }

    async assertLoaded(expectedName: string) {
        await expect(this.page).toHaveURL(/inventory-item\.html/);
        await expect(this.name).toHaveText(expectedName);
        await expect(this.description).toBeVisible();
        await expect(this.price).toBeVisible();
    }

    async assertPrice(expectedPrice: string) {
        await expect(this.price).toHaveText(expectedPrice);
    }

    async addToCart() {
        await this.addToCartBtn.click();
        await expect(this.page.locator('button:has-text("Remove")')).toBeVisible();
    }

    async backToProductsList() {
        await this.backToProducts.click();
        await expect(this.page).toHaveURL(/inventory\.html/);
    }
}
