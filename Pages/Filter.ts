import { Locator, Page, expect } from "@playwright/test";
import { parse } from 'csv-parse/sync';
import fs from 'fs';


const testdatacsv = './Data/testdata.csv';
fs.readFileSync(testdatacsv, 'utf-8');
const readfile = fs.readFileSync(testdatacsv, 'utf-8');
const records = parse(readfile, { columns: true, skip_empty_lines: true }) as Array<{ ClientCode: string, ClientName: string, Symbol: string, TransactionNo: string }>;
const loginURL = process.env.LoginURL!;
export class FilterPage {
    constructor(private page: Page) { }
    async applyClientCodeFilter(clientcodenumber: number) {
        await this.page.goto(process.env.Bills!);
        const clientcode_filter = await this.page.locator('#controllable-states-demo').first();
        await clientcode_filter.fill(`${records[clientcodenumber].ClientCode}`);
        await this.page.waitForTimeout(4000);
        const click_option = await this.page.locator('#controllable-states-demo-option-0');
        await expect(click_option).toBeVisible();
        await click_option.click();
        await this.page.getByRole('button', { name: 'Filter' }).click();

        // Wait for DataGrid to update
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);

        // Debug: Log the page structure (helpful when diagnosing selectors)
        const gridHTML = await this.page.locator('[role="grid"]').innerHTML().catch(() => '');

        // Try common grid row selectors (choose the one that matches your MUI version)
        let rows = this.page.locator('.MuiDataGrid-row');
        let rowCount = await rows.count();
        console.log("Rows found with .MuiDataGrid-row: " + rowCount);

        if (rowCount === 0) {
            rows = this.page.locator('[role="grid"] [role="row"]');
            rowCount = await rows.count();
            console.log("Rows found with [role='grid'] [role='row']: " + rowCount);
        }

        if (rowCount === 0) {
            rows = this.page.locator('[data-id]');
            rowCount = await rows.count();
            console.log("Rows found with [data-id]: " + rowCount);
        }

        console.log("Final row count: " + rowCount);

        // Wait for at least one visible row to avoid racing the grid render
        if (rowCount > 0) {
            await expect(rows.first()).toBeVisible({ timeout: 10000 });
        }

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const rowText = await row.innerText().catch(() => '');
            console.log(`Row ${i} cell text: ${rowText}`);

            // Assert that the row contains the expected client name. Use the locator assertion
            // which retries until the text appears (reduces flakiness).
            await expect(row).toContainText(records[clientcodenumber].ClientName, { timeout: 5000 });
        }
    }
}
