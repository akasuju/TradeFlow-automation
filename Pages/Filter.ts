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
        await setTimeout(() => { }, 4000);
        const click_option = await this.page.locator('#controllable-states-demo-option-0');
        await expect(click_option).toBeVisible();
        await click_option.click();
        const filter_button = await this.page.getByRole('button', { name: 'Filter' }).click();

    }
}
