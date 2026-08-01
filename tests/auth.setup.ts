import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AUTH_FILE } from '../playwright/auth';
import { LoginPage } from '../pages/Login';
import { users } from '../test-data/users';

setup('authenticate as standard user', async ({ page }) => {
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });

  const loginPage = new LoginPage(page);
  await loginPage.openPage();
  await loginPage.login(users.valid.username, users.valid.password);
  await page.waitForURL(/inventory\.html/);

  await page.context().storageState({ path: AUTH_FILE });
});
