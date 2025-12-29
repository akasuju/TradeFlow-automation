import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { test, expect } from "@playwright/test"
import "dotenv/config";
import { FilterPage } from '../Pages/Filter';

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

  test(' Filter Test client code filter', async ({ page }) => {
    const ClientFilter = new FilterPage(page);
    await ClientFilter.applyClientCodeFilter(1);
    await page.waitForLoadState('networkidle');

    
    
  })
});