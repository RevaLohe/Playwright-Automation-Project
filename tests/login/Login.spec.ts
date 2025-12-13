import { expect, test } from '@playwright/test'
import { LoginPage } from '../../pages/Login.spec'
import { users } from '../../test-data/users.spec';
import { Dashboard } from '../../pages/Dashboard.spec';

test.describe("Login Module", () => {

    test("Login with valid credentials @smoke", async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new Dashboard(page);

        await test.step("Navigate to Login page", async () => {
            await loginPage.openPage();
        })

        await test.step("Login with valid credentials", async () => {
            await loginPage.login(users.valid.username, users.valid.password)
        })

        await test.step("Verify Dashboard page is loaded", async () => {
            await dashboardPage.assertLoaded()
        })

    })

    test("Invalid credentials should show error @regression", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step("Navigate to Login page", async () => {
            await loginPage.openPage();
        })

        await test.step("Login with invalid credentials", async () => {
            await loginPage.login(users.invalid.username, users.invalid.password)
        })

        await test.step("Verify Error Message page is pops up", async () => {
            await loginPage.assertLoginError()
        })
    })
})

