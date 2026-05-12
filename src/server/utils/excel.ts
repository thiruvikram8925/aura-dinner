import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

const REPORTS_DIR = path.join(process.cwd(), 'reports');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR);
}

export async function appendToExcel(fileName: string, data: any[], columns: any[]) {
  const filePath = path.join(REPORTS_DIR, fileName);
  const workbook = new ExcelJS.Workbook();
  let worksheet: ExcelJS.Worksheet;

  if (fs.existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet(1) || workbook.addWorksheet('Sheet1');
  } else {
    worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = columns;
  }

  worksheet.addRow(data);
  await workbook.xlsx.writeFile(filePath);
}

export const ORDER_COLUMNS = [
  { header: 'Order ID', key: 'id', width: 20 },
  { header: 'Customer', key: 'customer', width: 25 },
  { header: 'Email', key: 'email', width: 30 },
  { header: 'Items', key: 'items', width: 40 },
  { header: 'Total', key: 'total', width: 15 },
  { header: 'Status', key: 'status', width: 15 },
  { header: 'Date', key: 'date', width: 20 },
];

export const REVIEW_COLUMNS = [
  { header: 'Name', key: 'userName', width: 25 },
  { header: 'Rating', key: 'rating', width: 10 },
  { header: 'Comment', key: 'comment', width: 50 },
  { header: 'Date', key: 'date', width: 20 },
];
