import { test, expect } from '../../fixtures/HooksFixtures';
import { LoginPage } from '../../pages/Login'
import { users } from '../../test-data/users';
import { Dashboard } from '../../pages/Dashboard';

test.describe("Login Module", () => {

    test("Login with valid credentials @smoke", async ({ loginLogoutFixture, page }) => {
        const dashboardPage = new Dashboard(page);

        await test.step("Verify Dashboard page is loaded", async () => {
            await dashboardPage.assertLoaded()
        })

    })

    test.describe("Unauthenticated flows", () => {
        test.use({ storageState: { cookies: [], origins: [] } });

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

        test("Locked out user should see locked out error @regression", async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.openPage();
            await loginPage.login(users.lockedOut.username, users.lockedOut.password);
            await loginPage.assertErrorContains(/sorry, this user has been locked out/i);
        })
    })

    test("Logout returns to login and blocks inventory access @smoke", async ({ loginLogoutFixture, page }) => {
        await loginLogoutFixture.logOut();
        await loginLogoutFixture.assertOnLoginPage();

        await page.goto("https://www.saucedemo.com/inventory.html");
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    })
})
