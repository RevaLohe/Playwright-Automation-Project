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

    async printInventoryItems() {
        console.log(this.inventoryItems)
        const count = await this.inventoryItems.count();
        console.log(count);
        const innnerText = await this.inventoryItems.allInnerTexts();
        console.log(innnerText);
    }



    async assertProductPageLoaded() {
        expect(this.page).toHaveURL(/inventory/)
        expect(this.pageTitle).toBeVisible();
        expect(this.pageTitle).toHaveText("Products")
    }

    async addItemToTheCartByName(itemname: string) {
        //Check if the item exists in the inventory & count should be alteast one
        const cart = this.itemCartByName(itemname);
        await expect(cart).toHaveCount(1);

        const addButton = cart.locator("button:has-text('Add to cart')");
        addButton.click();

        await expect(cart.locator("button")).toHaveText(/Remove/)
    }


    private itemCartByName(itemName: string) {
        return this.inventoryItems.filter({
            has: this.page.locator(".inventory_item_name", { hasText: itemName })
        });
    }

    async openCart() {
        this.cartIcon.click();
        await expect(this.page).toHaveURL(/cart\.html/)
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
}