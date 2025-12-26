import { Page } from "@playwright/test";
import { parse } from 'csv-parse/sync';
import fs from 'fs';

const testdatacsv = './Data/testdata.csv';
fs.readFileSync(testdatacsv, 'utf-8');
const readfile = fs.readFileSync(testdatacsv, 'utf-8');
const records = parse(readfile, { columns: true, skip_empty_lines: true });

