import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors.ts";

export class LoginPage{

    private readonly page: Page;
    private readonly usernameInput : Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessgae: Locator;
    private readonly hamburgurMenu: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator(testIds.usernameInput);
        this.passwordInput = page.locator(testIds.passwordInput);
        this.submitButton = page.locator(testIds.loginButton);
        this.errorMessgae = page.locator(testIds.errorMessage);
        this.hamburgurMenu = page.getByRole('button', { name: 'Open Menu' })
        this.logoutButton = page.locator(testIds.logOutBnutton)
        
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
        await expect(this.errorMessgae).toContainText(/do not match any user in this service/);
    }

    async logOut(){
        await this.hamburgurMenu.click();
        await this.logoutButton.click();
        await expect(this.submitButton).toBeVisible();
    }
    
}