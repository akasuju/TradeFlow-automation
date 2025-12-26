// import { test, expect } from '@playwright/test';
// import { getSelectedRow } from '../utils/excelutil';
// import { FilterPage } from '../Pages/Filter';


// test('Filter using selected Excel row and selected fields', async ({ page }) => {

//   // 🔥 Choose the row here (24th client)
//   const rowData = getSelectedRow(24);

//   const filterPage = new FilterPage(page);

//   // 🔥 Choose which filters to apply
//   await filterPage.Filters({
//     clientCode: rowData.ClientCode,      // OR undefined
//     stockSymbol: rowData.StockSymbol,    // OR undefined
//     transactionNo: rowData.TransactionNo // OR undefined
//   });

//   // Assertion example
//   const resultClient = await page.locator('table tbody tr:first-child td.client')
//     .textContent();

//   expect(resultClient?.trim()).toBe(rowData.ClientCode);
//});