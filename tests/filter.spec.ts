import { test, expect } from '@playwright/test';
import { getSelectedRow } from '../utils/excelutil';
import { FilterPage } from '../Pages/Filter';

test('Filter using selected excel row', async ({ page }) => {

    const testData = getSelectedRow();

    const filterPage = new FilterPage(page, testData);
    await filterPage.applyFilters();

    // Assertion example
    const clientInResult = await page.locator('table tbody tr:first-child td.client')
        .textContent();

    expect(clientInResult?.trim()).toBe(testData.ClientCode);
});
