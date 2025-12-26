import { Page } from "@playwright/test";
import * as XLSX from 'xlsx';
import path from 'path';

const TestData = path.join(__dirname, '../Data/testdata.xlsx');

export class FilterPage {
    constructor(private page: Page) { }
    async Filters(
    ) {
        const workbook = XLSX.readFile(TestData);
        const worksheet = workbook.Sheets["testdata"];
        const xlsToJson = XLSX.utils.sheet_to_json(worksheet);
        console.log(xlsToJson);

        const ClientCodeFilter = this.page.locator('#controllable-states-demo').first()
        await ClientCodeFilter.fill(``);
    }
}