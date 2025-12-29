import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://testing-keycloak.waterflow.technology/realms/naasa/protocol/openid-connect/auth?client_id=tradeflow&scope=openid&response_type=code&redirect_uri=https%3A%2F%2Ftesting-tradeflow.waterflowtechnology.net%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=wY15SIcsGzWOKdpf4Q5GEp9CPJdQHp4qmoKxnrP2ETg');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('nisha.badal@waterflow.technology');
    await page.getByRole('textbox', { name: 'Enter Your Password' }).click();
    await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('nisha@98696');
    await page.getByRole('textbox', { name: 'Enter Your Password' }).press('Enter');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Billing' }).click();
    await page.getByRole('link', { name: 'Bills' }).click();
    await page.locator('div').filter({ hasText: /^Buy$/ }).click();
    await page.getByRole('option', { name: 'Sell' }).click();
    await page.locator('div').filter({ hasText: /^Sell$/ }).click();
    await page.getByRole('option', { name: 'Buy' }).click();
    await page.locator('div:nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
    await page.locator('#textfield').click();
    await page.getByRole('button', { name: 'Clear' }).click();
    await page.getByRole('button', { name: 'Filter' }).click();
});