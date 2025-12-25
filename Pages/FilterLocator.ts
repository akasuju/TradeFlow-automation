import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Floorsheet' }).click();
  await page.getByRole('button', { name: 'Floorsheet' }).click();
  await page.locator('.MuiPopover-root.MuiMenu-root.MuiModal-root.css-v6eq9n > .MuiBackdrop-root').click();
  await page.getByRole('button', { name: 'Billing' }).click();
  await page.getByRole('menuitem', { name: 'Bills' }).click();
  await page.getByRole('button', { name: 'Open' }).nth(1).click();
  await page.getByRole('button', { name: 'Open' }).nth(1).click();
  await page.locator('#controllable-states-demo').first().click();
  await page.locator('#controllable-states-demo').first().fill('hello');
  await page.locator('#controllable-states-demo').first().press('Enter');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').nth(1).click();
  await page.locator('#controllable-states-demo').nth(1).click();
  await page.locator('#textfield').click();
  await page.locator('#textfield').click();
  await page.locator('#textfield').click();
  await page.locator('div').filter({ hasText: /^Buy$/ }).click();
  await page.getByRole('option', { name: 'Sell' }).click();
});