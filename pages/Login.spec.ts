import { expect, Locator, Page } from "@playwright/test";
import { testIds } from "../selectors/allselectors.ts";

export class LoginPage{

    private readonly page: Page;
    private readonly usernameInput : Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessgae: Locator

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator(testIds.usernameInput);
        this.passwordInput = page.locator(testIds.passwordInput);
        this.submitButton = page.locator(testIds.loginButton);
        this.errorMessgae = page.locator(testIds.errorMessage);
        
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
    
}