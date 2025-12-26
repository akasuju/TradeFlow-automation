import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import path from 'path';


test("Login", async ({ page }) => {
    //login
    await page.goto(process.env.LoginURL!);
    //await page.waitForURL(/.*keycloak.*/);

    //await expect(page).toHaveURL(/.*keycloak.*/);
    await page.pause();
});

