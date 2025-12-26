import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { test, expect } from "@playwright/test"

const testdatacsv = './Data/testdata.csv';
fs.readFileSync(testdatacsv, 'utf-8');
const readfile = fs.readFileSync(testdatacsv, 'utf-8');
const records = parse(readfile, { columns: true, skip_empty_lines: true }) as Array<{ ClientCode: string }>;

const loginURL = process.env.LoginURL!;

test(' Filter Test', async ({ page }) => {
  await page.goto(loginURL);
  const clientcode_filter = await page.locator('#controllable-states-demo');
  await clientcode_filter.fill(`${records[0].ClientCode}`);

});