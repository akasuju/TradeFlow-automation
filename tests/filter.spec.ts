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

  test(' Filter Test client code filter in Buy', async ({ page }) => {
    await page.goto(process.env.Bills!);
    const ClientFilter = new FilterPage(page);
    await ClientFilter.applyClientCodeFilter_Buy(2);
    await page.waitForLoadState('networkidle');

  });
  test(' Filter Test client code filter in Sell', async ({ page }) => {
    await page.goto(process.env.Bills!);
    const ClientFilter = new FilterPage(page);
    await ClientFilter.applyClientCodeFilter_Sell(0);
    await page.waitForLoadState('networkidle');

  });


  test('Filter test for date filter', async ({ page }) => {
    await page.goto(process.env.Bills!);
    const ClientFilter = new FilterPage(page);
    await ClientFilter.ADDateFilterAssertion("12/08/2025", "21/08/2025");//day/month/year
    await page.waitForLoadState('networkidle');
  });

  test('Filter test using BS date with type BUY', async ({ page }) => {
    await page.goto(process.env.Bills!);
    const clientfilter = new FilterPage(page);
    await clientfilter.BSDateFilterAssertion();
    await clientfilter.applyClientCodeFilter_Buy(2);
    await page.waitForLoadState('networkidle');
  });

test('Filter test using BS date with type SELL', async ({ page }) => {
    await page.goto(process.env.Bills!);
    const clientfilter = new FilterPage(page);
    await clientfilter.BSDateFilterAssertion();
    await clientfilter.applyClientCodeFilter_Sell(1);
    await page.waitForLoadState('networkidle');
  });

});
