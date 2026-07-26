import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors";

export class LoginPage{

    private readonly page: Page;
    private readonly usernameInput : Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessage: Locator;
    private readonly hamburgerMenu: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator(testIds.usernameInput);
        this.passwordInput = page.locator(testIds.passwordInput);
        this.submitButton = page.locator(testIds.loginButton);
        this.errorMessage = page.locator(testIds.errorMessage);
        this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = page.locator(testIds.logoutButton);
        
    }

    async login(username: string , password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async openPage(){
        await this.page.goto("https://www.saucedemo.com/")
    }

    async assertLoginError(){
        await expect(this.errorMessage).toContainText(/do not match any user in this service/);
    }

    async assertErrorContains(text: string | RegExp) {
        await expect(this.errorMessage).toContainText(text);
    }

    async assertOnLoginPage() {
        await expect(this.page).toHaveURL(/saucedemo\.com\/?$/);
        await expect(this.submitButton).toBeVisible();
    }

    async logOut(){
        await this.hamburgerMenu.click();
        await this.logoutButton.click();
        await this.assertOnLoginPage();
    }

    async resetAppState() {
        await this.hamburgerMenu.click();
        await this.page.locator(testIds.resetAppStateButton).click();
        // Close menu so inventory is interactive again
        const closeMenu = this.page.getByRole('button', { name: 'Close Menu' });
        if (await closeMenu.isVisible()) {
            await closeMenu.click();
        }
    }
    
}