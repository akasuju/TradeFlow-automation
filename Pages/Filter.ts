import { Page } from "@playwright/test";
import { parse } from 'csv-parse/sync';
import fs from 'fs';


const testdatacsv = './Data/testdata.csv';
fs.readFileSync(testdatacsv, 'utf-8');
const readfile = fs.readFileSync(testdatacsv, 'utf-8');
const records = parse(readfile, { columns: true, skip_empty_lines: true }) as Array<{ ClientCode: string }>;
const loginURL = process.env.LoginURL!;
export class FilterPage {
    constructor(private page: Page) { }
    async applyClientCodeFilter(clientcodenumber: number) {
        await this.page.goto(process.env.Bills!);
        const clientcode_filter = await this.page.locator('#controllable-states-demo').first();
        await clientcode_filter.fill(`${records[clientcodenumber].ClientCode}`);
        const click_option = await this.page.locator('#controllable-states-demo-option-0').click();

    }
}
