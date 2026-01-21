import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { test, expect } from "@playwright/test"
import "dotenv/config";
import { FilterPage } from '../Pages/Billing_Bills';

const testdatacsv = './Data/testdata.csv';
fs.readFileSync(testdatacsv, 'utf-8');
const readfile = fs.readFileSync(testdatacsv, 'utf-8');
const records = parse(readfile, { columns: true, skip_empty_lines: true }) as Array<{ ClientCode: string, ClientName: string, Symbol: string, TransactionNo: string }>;

const loginURL = process.env.LoginURL!;

test.describe('Filter Tests', () => {
  // test(' Filter Test for client code', async ({ page }) => {
  //   console.log(process.env.Bills!);
  //   await page.goto(process.env.Bills!);
  //   const clientcode_filter = await page.locator('#controllable-states-demo').first();
  //   await clientcode_filter.fill(`${records[0].ClientCode}`);
  //   await page.getByRole('button', { name: 'Filter' }).click();
  // });

  test.skip(' Filter Test client code filter in Buy', async ({ page }) => {
    const ClientFilter = new FilterPage(page);
    await ClientFilter.applyClientCodeFilter_Buy(1);
    await page.waitForLoadState('networkidle');

  });
  test(' Filter Test client code filter in Sell', async ({ page }) => {
    const ClientFilter = new FilterPage(page);
    await ClientFilter.applyClientCodeFilter_Sell(0);
    await page.waitForLoadState('networkidle');

  });

  test('Filter Test for number of total bills assertion', async ({ page }) => {
    const ClientFilter = new FilterPage(page);
    await ClientFilter.NumberofBillsassertion(0);
    await page.waitForLoadState('networkidle');
  });
  test.only('Filter test for date filter', async ({ page }) => {
    const ClientFilter = new FilterPage(page);
    await ClientFilter.DateFilterAssertion("12/08/2025", "21/08/2025");//day/month/year
    await page.waitForLoadState('networkidle');
  });
});
