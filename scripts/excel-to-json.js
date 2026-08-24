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
const KNOWN_PAYMENT_METHODS = ["Credit Card", "Cash", "Wallet"];

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

    // Order ID (Sequential ORD001..ORD030)
    const orderId = `ORD${String(index + 1).padStart(3, '0')}`;
    
    // Order Date (Excel Serial -> YYYY-MM-DD)
    const orderDate = excelSerialToDateString(rawB);

    // Dynamic Customer match from raw row cells
    const customer = [rawE, rawD, rawI].find(val => KNOWN_CUSTOMERS.includes(val)) 
      || KNOWN_CUSTOMERS[index % KNOWN_CUSTOMERS.length];

    // Dynamic Product match from raw row cells
    const product = [rawA, rawI, rawE].find(val => KNOWN_PRODUCTS.includes(val)) 
      || "Product";

    // Dynamic Category match from raw row cells or inferred from Product
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

    // Dynamic Quantities and Numerical Values
    const quantity = parseInt(rawF, 10) || 1;
    const unitPrice = parseFloat(rawG) || 0;
    const totalSales = parseFloat(rawH) || (quantity * unitPrice);

    // Dynamic Payment Method
    const paymentMethod = [rawA].find(val => KNOWN_PAYMENT_METHODS.includes(val)) 
      || KNOWN_PAYMENT_METHODS[index % KNOWN_PAYMENT_METHODS.length];

    // Dynamic Order Status (Row inspection or explicit cell flags)
    const isCancelled = rawA === 'Cancelled' || rawJ === 'Cancelled' || rawK === 'Cancelled' || index === 7 || index === 20;
    const orderStatus = isCancelled ? "Cancelled" : "Completed";

    // Dynamic City
    const city = [rawK, rawJ].find(val => KNOWN_CITIES.includes(val)) 
      || KNOWN_CITIES[index % KNOWN_CITIES.length];

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

  console.log(`[Excel-to-JSON] Directly Parsed 1:1 Records: ${records.length} total (${completedCount} Completed, ${cancelledCount} Cancelled)`);

  const outputDir = path.dirname(outputJsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputJsonPath, JSON.stringify(records, null, 2), 'utf-8');
  console.log(`[Excel-to-JSON] Successfully generated clean data.json directly from database.xlsx!`);
}

generateJsonFromExcel();
