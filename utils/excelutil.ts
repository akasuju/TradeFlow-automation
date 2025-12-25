import * as XLSX from 'xlsx';
import path from 'path';
import { EXCEL_ROW_INDEX } from '../config/testconfig';

const TestData = path.join(__dirname, '../Data/testdata.xlsx');

export function getSelectedRow(): any {
    const workbook = XLSX.readFile(TestData);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json<any>(worksheet);

    if (!data[EXCEL_ROW_INDEX]) {
        throw new Error(`Excel row ${EXCEL_ROW_INDEX + 1} does not exist`);
    }

    return data[EXCEL_ROW_INDEX];
}
