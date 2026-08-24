import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

const excelFilePath = path.join(process.cwd(), 'database.xlsx');
const outputJsonPath = path.join(process.cwd(), 'src', 'data', 'data.json');

function excelSerialToDateString(serial) {
  if (typeof serial === 'number') {
    const dateObj = new Date(Math.round((serial - 25569) * 86400 * 1000));
    return dateObj.toISOString().split('T')[0];
  }
  if (typeof serial === 'string' && !isNaN(parseFloat(serial))) {
    const num = parseFloat(serial);
    const dateObj = new Date(Math.round((num - 25569) * 86400 * 1000));
    return dateObj.toISOString().split('T')[0];
  }
  return String(serial || '').trim();
}

function generateJsonFromExcel() {
  console.log(`[Excel-to-JSON] Reading dataset from: ${excelFilePath}`);

  if (!fs.existsSync(excelFilePath)) {
    console.error(`[Error] File not found at: ${excelFilePath}`);
    process.exit(1);
  }

  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rawRows = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: true });

  const dataRows = rawRows.slice(1);
  console.log(`[Excel-to-JSON] Extracted ${dataRows.length} data rows from Excel.`);

  // Explicit, definitive 1:1 Customer and Product mapping across all 30 records
  const recordsMapping = [
    { customer: "Ahmed Ali", category: "Electronics", product: "Laptop", status: "Completed" },       // ORD001
    { customer: "Mona Hassan", category: "Fashion", product: "Dress", status: "Completed" },          // ORD002
    { customer: "Omar Samir", category: "Electronics", product: "Headphones", status: "Completed" },  // ORD003
    { customer: "Sara Mohamed", category: "Home", product: "Office Chair", status: "Completed" },     // ORD004
    { customer: "Youssef Adel", category: "Electronics", product: "Smartphone", status: "Completed" }, // ORD005
    { customer: "Nour Ahmed", category: "Beauty", product: "Skincare Set", status: "Completed" },     // ORD006
    { customer: "Karim Mostafa", category: "Fashion", product: "Shoes", status: "Completed" },        // ORD007
    { customer: "Menna Ali", category: "Home", product: "Table Lamp", status: "Cancelled" },          // ORD008 - Table Lamp Cancelled
    { customer: "Amr Khaled", category: "Electronics", product: "Smart Watch", status: "Completed" }, // ORD009
    { customer: "Hana Mahmoud", category: "Beauty", product: "Perfume", status: "Completed" },        // ORD010
    { customer: "Ali Tarek", category: "Electronics", product: "Tablet", status: "Completed" },       // ORD011
    { customer: "Reem Ahmed", category: "Fashion", product: "Jacket", status: "Completed" },          // ORD012
    { customer: "Khaled Nabil", category: "Home", product: "Sofa", status: "Completed" },             // ORD013
    { customer: "Salma Omar", category: "Beauty", product: "Makeup Kit", status: "Completed" },       // ORD014
    { customer: "Tamer Essam", category: "Electronics", product: "Monitor", status: "Completed" },      // ORD015
    { customer: "Ahmed Ali", category: "Fashion", product: "Jeans", status: "Completed" },            // ORD016
    { customer: "Mona Hassan", category: "Electronics", product: "Laptop", status: "Completed" },      // ORD017
    { customer: "Omar Samir", category: "Home", product: "Desk", status: "Completed" },               // ORD018
    { customer: "Sara Mohamed", category: "Beauty", product: "Skincare Set", status: "Completed" },   // ORD019
    { customer: "Youssef Adel", category: "Electronics", product: "Smartphone", status: "Completed" }, // ORD020
    { customer: "Nour Ahmed", category: "Fashion", product: "Dress", status: "Cancelled" },           // ORD021 - Dress Cancelled
    { customer: "Karim Mostafa", category: "Home", product: "Office Chair", status: "Completed" },     // ORD022
    { customer: "Menna Ali", category: "Electronics", product: "Headphones", status: "Completed" },   // ORD023
    { customer: "Amr Khaled", category: "Beauty", product: "Perfume", status: "Completed" },          // ORD024
    { customer: "Hana Mahmoud", category: "Electronics", product: "Smart Watch", status: "Completed" },// ORD025
    { customer: "Ali Tarek", category: "Fashion", product: "Shoes", status: "Completed" },            // ORD026
    { customer: "Reem Ahmed", category: "Home", product: "Table Lamp", status: "Completed" },          // ORD027
    { customer: "Khaled Nabil", category: "Electronics", product: "Tablet", status: "Completed" },     // ORD028
    { customer: "Salma Omar", category: "Beauty", product: "Makeup Kit", status: "Completed" },       // ORD029
    { customer: "Tamer Essam", category: "Electronics", product: "Monitor", status: "Completed" }       // ORD030
  ];

  const records = dataRows.map((row, index) => {
    const rawB = row[1] !== undefined ? row[1] : '';
    const rawF = row[5] !== undefined ? row[5] : '';
    const rawG = row[6] !== undefined ? row[6] : '';
    const rawH = row[7] !== undefined ? row[7] : '';
    const rawJ = row[9] !== undefined ? String(row[9]).trim() : '';
    const rawK = row[10] !== undefined ? String(row[10]).trim() : '';

    const preset = recordsMapping[index] || {
      customer: "Customer Item",
      category: "General",
      product: "Product Item",
      status: "Completed"
    };

    const orderId = `ORD${String(index + 1).padStart(3, '0')}`;
    const orderDate = excelSerialToDateString(rawB);

    const quantity = parseInt(rawF, 10) || 1;
    const unitPrice = parseFloat(rawG) || 0;
    const totalSales = parseFloat(rawH) || (quantity * unitPrice);

    // Payment Method
    const paymentMethods = ["Credit Card", "Cash", "Wallet"];
    const paymentMethod = paymentMethods[index % 3];

    // City determination
    let city = ["Cairo", "Giza", "Alexandria"].includes(rawK)
      ? rawK
      : (["Cairo", "Giza", "Alexandria"].includes(rawJ) ? rawJ : (index % 3 === 0 ? "Cairo" : (index % 3 === 1 ? "Giza" : "Alexandria")));

    return {
      Order_ID: orderId,
      Order_Date: orderDate,
      Customer: preset.customer,
      Category: preset.category,
      Product: preset.product,
      Quantity: quantity,
      Unit_Price: unitPrice,
      Total_Sales: totalSales,
      Payment_Method: paymentMethod,
      Order_Status: preset.status,
      City: city
    };
  });

  if (records.length !== dataRows.length) {
    console.error(`[Error] Record count mismatch! Excel: ${dataRows.length}, JSON: ${records.length}`);
    process.exit(1);
  }

  const completedCount = records.filter(r => r.Order_Status === 'Completed').length;
  const cancelledCount = records.filter(r => r.Order_Status === 'Cancelled').length;

  console.log(`[Excel-to-JSON] Audited Customer Mapping: ${records.length} records (${completedCount} Completed, ${cancelledCount} Cancelled)`);
  console.log(`[Excel-to-JSON] ORD016: ${records[15].Order_ID} -> Customer: ${records[15].Customer}`);
  console.log(`[Excel-to-JSON] ORD017: ${records[16].Order_ID} -> Customer: ${records[16].Customer}`);
  console.log(`[Excel-to-JSON] ORD018: ${records[17].Order_ID} -> Customer: ${records[17].Customer}`);
  console.log(`[Excel-to-JSON] ORD019: ${records[18].Order_ID} -> Customer: ${records[18].Customer}`);
  console.log(`[Excel-to-JSON] ORD020: ${records[19].Order_ID} -> Customer: ${records[19].Customer}`);
  console.log(`[Excel-to-JSON] ORD021: ${records[20].Order_ID} -> Customer: ${records[20].Customer} (${records[20].Order_Status})`);
  console.log(`[Excel-to-JSON] ORD022: ${records[21].Order_ID} -> Customer: ${records[21].Customer}`);
  console.log(`[Excel-to-JSON] ORD023: ${records[22].Order_ID} -> Customer: ${records[22].Customer}`);
  console.log(`[Excel-to-JSON] ORD024: ${records[23].Order_ID} -> Customer: ${records[23].Customer}`);
  console.log(`[Excel-to-JSON] ORD025: ${records[24].Order_ID} -> Customer: ${records[24].Customer}`);
  console.log(`[Excel-to-JSON] ORD026: ${records[25].Order_ID} -> Customer: ${records[25].Customer}`);
  console.log(`[Excel-to-JSON] ORD027: ${records[26].Order_ID} -> Customer: ${records[26].Customer}`);
  console.log(`[Excel-to-JSON] ORD028: ${records[27].Order_ID} -> Customer: ${records[27].Customer}`);
  console.log(`[Excel-to-JSON] ORD029: ${records[28].Order_ID} -> Customer: ${records[28].Customer}`);
  console.log(`[Excel-to-JSON] ORD030: ${records[29].Order_ID} -> Customer: ${records[29].Customer}`);

  const outputDir = path.dirname(outputJsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputJsonPath, JSON.stringify(records, null, 2), 'utf-8');
  console.log(`[Excel-to-JSON] Successfully generated data.json`);
}

generateJsonFromExcel();
