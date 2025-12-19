import{test as baseTest} from '@playwright/test'
import { LoginPage } from '../pages/Login.spec'
import { users } from '../test-data/users.spec'

type HooksFixtures={
    loginLogoutFixture: LoginPage
}

export const test = baseTest.extend<HooksFixtures>({

    loginLogoutFixture: async ({page}, use)=>{

        const loginPage = new LoginPage(page);

        //Login
        await loginPage.openPage();
        await loginPage.login(users.valid.username, users.valid.password);
        
        await use(loginPage);

        await loginPage.logOut();

    }
})
