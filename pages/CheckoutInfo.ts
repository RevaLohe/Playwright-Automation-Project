import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors";

export class CheckoutInfo {
    private readonly page: Page;
    private readonly pageTitle: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueBtn: Locator;
    private readonly cancelBtn: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator(testIds.pageTitle);
        this.firstName = page.locator(testIds.firstNameInput);
        this.lastName = page.locator(testIds.lastNameInput);
        this.postalCode = page.locator(testIds.postalCodeInput);
        this.continueBtn = page.locator(testIds.continueButton);
        this.cancelBtn = page.locator(testIds.cancelButton);
        this.errorMessage = page.locator(testIds.errorMessage);
    }

    async assertLoaded() {
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
        await expect(this.pageTitle).toHaveText("Checkout: Your Information");
    }

    async fillInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async continue() {
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    }

    async continueExpectingError() {
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    }

    async cancel() {
        await this.cancelBtn.click();
        await expect(this.page).toHaveURL(/cart\.html/);
    }

    async assertErrorContains(text: string | RegExp) {
        await expect(this.errorMessage).toContainText(text);
    }
}
