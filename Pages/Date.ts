import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://testing-keycloak.waterflow.technology/realms/naasa/protocol/openid-connect/auth?client_id=tradeflow&scope=openid&response_type=code&redirect_uri=https%3A%2F%2Ftesting-tradeflow.waterflowtechnology.net%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=aJl0szLbnfW5s4TS5MvFh3VE4gtYgWHHa74unisLc4k');
  await page.getByRole('button', { name: 'Clear' }).click();
  await page.locator('div').filter({ hasText: /^AD$/ }).click();
  await page.getByRole('option', { name: 'BS' }).click();
  await page.locator('div').filter({ hasText: /^Nepali Date From$/ }).getByRole('textbox').click();
  await page.getByTitle('Previous').click();
  await page.getByTitle('Previous').click();
  await page.getByTitle('Previous').click();
  await page.getByTitle('Previous').click();
  await page.getByTitle('Previous').getByRole('img').click();
  await page.getByRole('table').getByRole('cell', { name: '10' }).click();
  await page.locator('div').filter({ hasText: /^Nepali Date To$/ }).getByRole('textbox').click();
  await page.getByRole('cell', { name: '7', exact: true }).click();
});