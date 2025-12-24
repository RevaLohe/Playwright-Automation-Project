import { test , expect} from '../../fixtures/HooksFixtures';
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

