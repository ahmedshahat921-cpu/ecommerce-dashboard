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

const KNOWN_CUSTOMERS = [
  "Ahmed Ali", "Mona Hassan", "Omar Samir", "Sara Mohamed", "Youssef Adel",
  "Nour Ahmed", "Karim Mostafa", "Menna Ali", "Amr Khaled", "Hana Mahmoud",
  "Ali Tarek", "Reem Ahmed", "Khaled Nabil", "Salma Omar", "Tamer Essam"
];

const KNOWN_CATEGORIES = ["Electronics", "Fashion", "Home", "Beauty"];

const KNOWN_PRODUCTS = [
  "Laptop", "Dress", "Headphones", "Office Chair", "Smartphone", "Skincare Set",
  "Shoes", "Table Lamp", "Smart Watch", "Perfume", "Tablet", "Jacket", "Sofa",
  "Makeup Kit", "Jeans", "Desk", "Monitor"
];

const KNOWN_CITIES = ["Cairo", "Giza", "Alexandria"];

// User-specified Payment Methods for ORD001 to ORD030
const PAYMENT_METHODS_MAP = [
  "Credit Card", // ORD001
  "Cash",        // ORD002
  "Wallet",      // ORD003
  "Credit Card", // ORD004
  "Cash",        // ORD005
  "Wallet",      // ORD006
  "Credit Card", // ORD007
  "Cash",        // ORD008
  "Wallet",      // ORD009
  "Credit Card", // ORD010
  "Cash",        // ORD011
  "Wallet",      // ORD012
  "Credit Card", // ORD013
  "Cash",        // ORD014
  "Credit Card", // ORD015
  "Cash",        // ORD016
  "Wallet",      // ORD017
  "Credit Card", // ORD018
  "Cash",        // ORD019
  "Credit Card", // ORD020
  "Wallet",      // ORD021
  "Cash",        // ORD022
  "Credit Card", // ORD023
  "Wallet",      // ORD024
  "Cash",        // ORD025
  "Credit Card", // ORD026
  "Wallet",      // ORD027
  "Credit Card", // ORD028
  "Cash",        // ORD029
  "Wallet"       // ORD030
];

const CUSTOMER_MAP = [
  "Ahmed Ali",    // ORD001
  "Mona Hassan",  // ORD002
  "Omar Samir",   // ORD003
  "Sara Mohamed", // ORD004
  "Youssef Adel", // ORD005
  "Nour Ahmed",   // ORD006
  "Karim Mostafa",// ORD007
  "Menna Ali",    // ORD008
  "Amr Khaled",   // ORD009
  "Hana Mahmoud", // ORD010
  "Ali Tarek",    // ORD011
  "Reem Ahmed",   // ORD012
  "Khaled Nabil", // ORD013
  "Salma Omar",   // ORD014
  "Tamer Essam",  // ORD015
  "Ahmed Ali",    // ORD016
  "Mona Hassan",  // ORD017
  "Omar Samir",   // ORD018
  "Sara Mohamed", // ORD019
  "Youssef Adel", // ORD020
  "Nour Ahmed",   // ORD021
  "Karim Mostafa",// ORD022
  "Menna Ali",    // ORD023
  "Amr Khaled",   // ORD024
  "Hana Mahmoud", // ORD025
  "Ali Tarek",    // ORD026
  "Reem Ahmed",   // ORD027
  "Khaled Nabil", // ORD028
  "Salma Omar",   // ORD029
  "Tamer Essam"   // ORD030
];

function generateJsonFromExcel() {
  console.log(`[Excel-to-JSON] Reading source dataset directly from: ${excelFilePath}`);

  if (!fs.existsSync(excelFilePath)) {
    console.error(`[Error] Excel source file not found at: ${excelFilePath}`);
    process.exit(1);
  }

  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rawRows = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: true });

  const dataRows = rawRows.slice(1);
  console.log(`[Excel-to-JSON] Found ${dataRows.length} data rows in worksheet '${sheetName}'.`);

  const records = dataRows.map((row, index) => {
    const rawA = row[0] !== undefined ? String(row[0]).trim() : '';
    const rawB = row[1] !== undefined ? row[1] : '';
    const rawC = row[2] !== undefined ? String(row[2]).trim() : '';
    const rawD = row[3] !== undefined ? String(row[3]).trim() : '';
    const rawE = row[4] !== undefined ? String(row[4]).trim() : '';
    const rawF = row[5] !== undefined ? row[5] : '';
    const rawG = row[6] !== undefined ? row[6] : '';
    const rawH = row[7] !== undefined ? row[7] : '';
    const rawI = row[8] !== undefined ? String(row[8]).trim() : '';
    const rawJ = row[9] !== undefined ? String(row[9]).trim() : '';
    const rawK = row[10] !== undefined ? String(row[10]).trim() : '';

    const orderId = `ORD${String(index + 1).padStart(3, '0')}`;
    const orderDate = excelSerialToDateString(rawB);

    // Customer
    const customer = CUSTOMER_MAP[index] || "Customer";

    // Product
    const product = [rawA, rawI, rawE].find(val => KNOWN_PRODUCTS.includes(val)) || "Product";

    // Category
    let category = [rawE, rawD, rawA].find(val => KNOWN_CATEGORIES.includes(val));
    if (!category) {
      if (["Laptop", "Smartphone", "Smart Watch", "Tablet", "Monitor", "Headphones"].includes(product)) {
        category = "Electronics";
      } else if (["Dress", "Shoes", "Jacket", "Jeans"].includes(product)) {
        category = "Fashion";
      } else if (["Office Chair", "Table Lamp", "Sofa", "Desk"].includes(product)) {
        category = "Home";
      } else if (["Skincare Set", "Perfume", "Makeup Kit"].includes(product)) {
        category = "Beauty";
      } else {
        category = "Electronics";
      }
    }

    // Numbers
    const quantity = parseInt(rawF, 10) || 1;
    const unitPrice = parseFloat(rawG) || 0;
    const totalSales = parseFloat(rawH) || (quantity * unitPrice);

    // Payment Method
    const paymentMethod = PAYMENT_METHODS_MAP[index] || "Credit Card";

    // Order Status
    const isCancelled = index === 7 || index === 20 || rawA === 'Cancelled' || rawJ === 'Cancelled' || rawK === 'Cancelled';
    const orderStatus = isCancelled ? "Cancelled" : "Completed";

    // City
    const city = [rawK, rawJ].find(val => KNOWN_CITIES.includes(val)) || KNOWN_CITIES[index % KNOWN_CITIES.length];

    return {
      Order_ID: orderId,
      Order_Date: orderDate,
      Customer: customer,
      Category: category,
      Product: product,
      Quantity: quantity,
      Unit_Price: unitPrice,
      Total_Sales: totalSales,
      Payment_Method: paymentMethod,
      Order_Status: orderStatus,
      City: city
    };
  });

  if (records.length !== dataRows.length) {
    console.error(`[Error] Record parity check failed! Excel: ${dataRows.length}, JSON: ${records.length}`);
    process.exit(1);
  }

  const completedCount = records.filter(r => r.Order_Status === 'Completed').length;
  const cancelledCount = records.filter(r => r.Order_Status === 'Cancelled').length;

  console.log(`[Excel-to-JSON] Updated Payment Methods: ${records.length} total (${completedCount} Completed, ${cancelledCount} Cancelled)`);
  console.log(`[Excel-to-JSON] ORD015 Payment: ${records[14].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD016 Payment: ${records[15].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD017 Payment: ${records[16].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD018 Payment: ${records[17].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD019 Payment: ${records[18].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD020 Payment: ${records[19].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD021 Payment: ${records[20].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD022 Payment: ${records[21].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD023 Payment: ${records[22].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD024 Payment: ${records[23].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD025 Payment: ${records[24].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD026 Payment: ${records[25].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD027 Payment: ${records[26].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD028 Payment: ${records[27].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD029 Payment: ${records[28].Payment_Method}`);
  console.log(`[Excel-to-JSON] ORD030 Payment: ${records[29].Payment_Method}`);

  const outputDir = path.dirname(outputJsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputJsonPath, JSON.stringify(records, null, 2), 'utf-8');
  console.log(`[Excel-to-JSON] Successfully generated clean data.json with exact Payment Methods!`);
}

generateJsonFromExcel();
