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
    async applyClientCodeFilter_Buy(clientcodenumber: number) {


        // Apply Client Code filter
        const clientcode = records[clientcodenumber].ClientCode;
        const clientName = records[clientcodenumber].ClientName;

        const clientcodeFilter = this.page.getByRole('combobox').first();
        await clientcodeFilter.fill(`${clientcode}`);

        const option = this.page.getByRole('option', { name: `${clientcode}` });
        await expect(option).toBeVisible();
        await option.click();

        await this.page.getByRole('button', { name: 'Filter' }).click();

        // Wait for grid data to load
        await this.page.waitForResponse(res =>
            res.url().includes('/bills') && res.status() === 200
        );

        const grid = this.page.locator('[role="grid"]');
        await expect(grid).toBeVisible();

        const scroller = this.page.locator('.MuiDataGrid-virtualScroller');
        const rowsLocator = this.page.locator('.MuiDataGrid-row');

        const verifiedRows = new Set<string>();
        let lastVerifiedCount = 0;

        // Scroll through the virtualized grid and collect unique row data
        while (true) {
            const rowCount = await rowsLocator.count();

            for (let i = 0; i < rowCount; i++) {
                const row = rowsLocator.nth(i);
                const text = (await row.innerText()).trim();

                if (!verifiedRows.has(text)) {
                    // Assert each row contains client name
                    expect(text).toContain(clientName);
                    verifiedRows.add(text);
                }
            }

            // Scroll one viewport down
            await scroller.evaluate(el => {
                el.scrollTop += el.clientHeight;
            });

            await this.page.waitForTimeout(500);

            // Stop when no new rows appear
            if (verifiedRows.size === lastVerifiedCount) break;
            lastVerifiedCount = verifiedRows.size;
        }

        console.log('Total verified rows:', verifiedRows.size);

        // Final assertion for each row: check client name & client code
        for (const rowText of verifiedRows) {
            expect(rowText).toContain(clientName);
            expect(rowText).toContain(clientcode);
        }


        // ✅ Extract total bills from UI label robustly
        const totalBillsLocator = this.page.locator(
            "//span[contains(normalize-space(), 'Total Bills')]"
        );
        await expect(totalBillsLocator).toBeVisible({ timeout: 10000 });

        const totalBillsText = await totalBillsLocator.innerText();
        // Example: "Total Bills : 10"
        const totalBills = Number(totalBillsText.replace(/\D+/g, ''));

        console.log('Total bills from UI:', totalBills);

        // Assert verified rows match total bills
        expect(verifiedRows.size).toBe(totalBills);

    }
    async applyClientCodeFilter_Sell(clientcodenumber: number) {
        await this.page.goto(process.env.Bills!);

        // Apply Client Code filter
        const clientcode = records[clientcodenumber].ClientCode;
        const clientName = records[clientcodenumber].ClientName;
        const BuySell_Filter = await this.page.locator('div').filter({ hasText: /^Buy$/ }).click();
        const Sell_Filter = await this.page.getByRole('option', { name: 'Sell' }).click();
        const clientcodeFilter = this.page.getByRole('combobox').first();
        await clientcodeFilter.fill(`${clientcode}`);

        const option = this.page.getByRole('option', { name: `${clientcode}` });
        await expect(option).toBeVisible();
        await option.click();

        await this.page.getByRole('button', { name: 'Filter' }).click();

        // Wait for grid data to load
        await this.page.waitForResponse(res =>
            res.url().includes('/bills') && res.status() === 200
        );

        const grid = this.page.locator('[role="grid"]');
        await expect(grid).toBeVisible();

        const scroller = this.page.locator('.MuiDataGrid-virtualScroller');
        const rowsLocator = this.page.locator('.MuiDataGrid-row');

        const verifiedRows = new Set<string>();
        let lastVerifiedCount = 0;

        // Scroll through the virtualized grid and collect unique row data
        while (true) {
            const rowCount = await rowsLocator.count();

            for (let i = 0; i < rowCount; i++) {
                const row = rowsLocator.nth(i);
                const text = (await row.innerText()).trim();

                if (!verifiedRows.has(text)) {
                    // Assert each row contains client name
                    expect(text).toContain(clientName);
                    verifiedRows.add(text);
                }
            }

            // Scroll one viewport down
            await scroller.evaluate(el => {
                el.scrollTop += el.clientHeight;
            });

            await this.page.waitForTimeout(500);

            // Stop when no new rows appear
            if (verifiedRows.size === lastVerifiedCount) break;
            lastVerifiedCount = verifiedRows.size;
        }

        console.log('Total verified rows:', verifiedRows.size);

        // Final assertion for each row: check client name & client code
        for (const rowText of verifiedRows) {
            expect(rowText).toContain(clientName);
            expect(rowText).toContain(clientcode);
        }

        // ✅ Extract total bills from UI label robustly
        const totalBillsLocator = this.page.locator(
            "//span[contains(normalize-space(), 'Total Bills')]"
        );
        await expect(totalBillsLocator).toBeVisible({ timeout: 10000 });

        const totalBillsText = await totalBillsLocator.innerText();
        // Example: "Total Bills : 10"
        const totalBills = Number(totalBillsText.replace(/\D+/g, ''));

        console.log('Total bills from UI:', totalBills);

        // Assert verified rows match total bills
        expect(verifiedRows.size).toBe(totalBills);
    }

    async ADDateFilterAssertion(fromdate: string, todate: string) {
        await this.page.waitForLoadState('networkidle');

        // Wait for date fields to be visible and enabled before filling
        // const fromDateLocator = this.page.locator('#fromDate');
        // const toDateLocator = this.page.locator('#toDate');
        await this.page.waitForTimeout(4000);
        const fromDateLocator = this.page.getByRole('textbox', { name: 'dd/mm/yyyy' }).nth(0);
        const toDateLocator = this.page.getByRole('textbox', { name: 'dd/mm/yyyy' }).nth(1);

        await expect(fromDateLocator).toBeVisible({ timeout: 10000 });
        await expect(toDateLocator).toBeVisible({ timeout: 10000 });

        await fromDateLocator.fill(fromdate);
        await toDateLocator.fill(todate);

        await this.page.getByRole('button', { name: 'Filter' }).click();
        // Wait for DataGrid to update 
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);

        // Try common grid row selectors (choose the one that matches your MUI version)
        let rows = this.page.locator('.MuiDataGrid-row');
        let rowCount = await rows.count();
        console.log("Final row count: " + rowCount);

        // Wait for at least one visible row to avoid racing the grid render
        if (rowCount > 0) {
            await expect(rows.first()).toBeVisible({ timeout: 10000 });
        }
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const dateCell = row.locator('div[data-field="billDate"]'); // Adjust selector based on actual data-field
            const dateText = await dateCell.innerText();
            const billDate = new Date(dateText);
            const fromDateObj = new Date(fromdate);
            const toDateObj = new Date(todate);

            console.log(`Row ${i}: dateText="${dateText}", billDate=${billDate}, fromDate=${fromDateObj}, toDate=${toDateObj}`);
            console.log(`Row ${i}: billDate >= fromDateObj? ${billDate >= fromDateObj}, billDate <= toDateObj? ${billDate <= toDateObj}`);

            expect(billDate >= fromDateObj && billDate <= toDateObj).toBeTruthy();
        }
    }
    async BSDateFilterAssertion() {
        await this.page.locator('div').filter({ hasText: /^AD$/ }).click();
        await this.page.getByRole('option', { name: 'BS' }).click();
        await this.page.locator('div').filter({ hasText: /^Nepali Date From$/ }).getByRole('textbox').click();
        await this.page.getByTitle('Previous').click();
        await this.page.getByTitle('Previous').click();
        await this.page.getByTitle('Previous').click();
        await this.page.getByTitle('Previous').click();
        await this.page.getByTitle('Previous').getByRole('img').click();
        await this.page.getByRole('table').getByRole('cell', { name: '10' }).click();
        await this.page.locator('div').filter({ hasText: /^Nepali Date To$/ }).getByRole('textbox').click();
        await this.page.getByRole('cell', { name: '7', exact: true }).click();
        await this.page.getByRole('button', { name: 'Filter' }).click();
    };
    
    async sellbilltype() {
        const BuySell_Filter = await this.page.locator('div').filter({ hasText: /^Buy$/ }).click();
        const Sell_Filter = await this.page.getByRole('option', { name: 'Sell' }).click();
    }

}