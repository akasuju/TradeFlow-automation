import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import path from 'path';

const TestData = path.join(__dirname, '../Data/testdata.xlsx');
test("Login", async ({ page }) => {
    //login
    await page.goto(process.env.LoginURL!);
    //await page.waitForURL(/.*keycloak.*/);
    await expect(page).toHaveURL(process.env.ExpectedLoginURL!);

    //await expect(page).toHaveURL(/.*keycloak.*/);
    await page.pause();
});
test("Filter Locator", async ({ page }) => {
    const workbook = XLSX.readFile(TestData);
    const worksheet = workbook.Sheets["testdata"];
    const xlsToJson = XLSX.utils.sheet_to_json(worksheet);
    console.log(xlsToJson);
    
    
});
