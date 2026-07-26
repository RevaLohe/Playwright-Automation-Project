import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors";

export type SortOption =
    | "az"
    | "za"
    | "lohi"
    | "hilo";

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

    async getCartItemCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            const count = await this.cartBadge.innerText();
            return Number(count);
        }
        return 0;
    }

    async assertProductPageLoaded() {
        await expect(this.page).toHaveURL(/inventory/);
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText("Products");
    }

    async assertProductCount(expected: number) {
        await expect(this.inventoryItems).toHaveCount(expected);
    }

    async assertItemPrice(itemName: string, expectedPrice: string) {
        const card = this.itemCartByName(itemName);
        await expect(card.locator(".inventory_item_price")).toHaveText(expectedPrice);
    }

    async addItemToTheCartByName(itemname: string) {
        const cart = this.itemCartByName(itemname);
        await expect(cart).toHaveCount(1);

        const addButton = cart.locator("button:has-text('Add to cart')");
        await addButton.click();

        await expect(cart.locator("button")).toHaveText(/Remove/);
    }

    private itemCartByName(itemName: string) {
        return this.inventoryItems.filter({
            has: this.page.locator(".inventory_item_name", { hasText: itemName })
        });
    }

    async openCart() {
        await this.cartIcon.click();
        await expect(this.page).toHaveURL(/cart\.html/);
    }

    async assertCartBadgeCount(expected: number) {
        if (expected === 0) {
            await expect(this.cartBadge).toHaveCount(0);
        } else {
            await expect(this.cartBadge).toHaveText(String(expected));
        }
    }

    async removeItemFromCartByName(itemName: string) {
        const card = this.itemCartByName(itemName);
        await expect(card).toHaveCount(1);

        const removeBtn = card.locator("button:has-text('Remove')");
        await removeBtn.click();

        await expect(card.locator("button")).toHaveText(/Add to cart/i);
    }

    async assertCartBadgeHidden() {
        await expect(this.cartBadge).toHaveCount(0);
    }

    async sortBy(option: SortOption) {
        await this.sortDropdown.selectOption(option);
    }

    async getFirstItemName(): Promise<string> {
        return (await this.inventoryItems.first().locator(".inventory_item_name").innerText()).trim();
    }

    async getFirstItemPrice(): Promise<string> {
        return (await this.inventoryItems.first().locator(".inventory_item_price").innerText()).trim();
    }

    async assertFirstItemName(expected: string) {
        await expect(this.inventoryItems.first().locator(".inventory_item_name")).toHaveText(expected);
    }

    async assertFirstItemPrice(expected: string) {
        await expect(this.inventoryItems.first().locator(".inventory_item_price")).toHaveText(expected);
    }

    async openProductByName(itemName: string) {
        const card = this.itemCartByName(itemName);
        await card.locator(".inventory_item_name").click();
        await expect(this.page).toHaveURL(/inventory-item\.html/);
    }
}
