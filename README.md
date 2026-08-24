# E-Commerce Analytics Dashboard

A modern, high-performance, professional E-Commerce Analytics Dashboard built with **React**, **Vite**, **Tailwind CSS**, **Recharts**, and **Lucide Icons**. All business metrics, KPIs, charts, filters, and data tables are computed strictly and dynamically from the authentic dataset source `database.xlsx`.

---

## Data Pipeline Architecture

```
ORIGINAL EXCEL (database.xlsx)
        ↓
EXCEL INSPECTION (scripts/excel-to-json.js)
        ↓
REUSABLE CONVERSION UTILITY (npm run data:generate)
        ↓
RUNTIME DATASET (src/data/data.json)
        ↓
DYNAMIC DATA PROCESSING & FILTER ENGINE (src/utils/dataProcessor.js)
        ↓
DYNAMIC KPIs / CHARTS / DATA TABLE (React Components)
        ↓
GITHUB (https://github.com/ahmedshahat921-cpu/ecommerce-dashboard.git)
        ↓
VERCEL PRODUCTION DEPLOYMENT
```

---

## Key Features

1. **Strict Source of Truth**: Powered strictly by `database.xlsx` located at the project root (`e:\my project\ecommerce1-dashboard\database.xlsx`). Zero mock or hardcoded business statistics.
2. **Verified Parity**: 100% record parity between Excel and `data.json` (Verified: 30 Excel rows === 30 JSON records).
3. **Dynamic Executive KPIs**:
   - **Total Sales**: Sum of total sales ($) across filtered dataset.
   - **Total Orders**: Count of active filtered orders.
   - **Completed Orders**: Count & completion percentage rate.
   - **Cancelled Orders**: Count & cancellation percentage rate.
   - **Average Order Value (AOV)**: Revenue per transaction ($).
   - **Total Quantity Sold**: Sum of physical product units sold.
4. **Multi-Dimensional Interactive Filters**:
   - **Date Range Picker**: Filter by Start Date and End Date.
   - **Category Filter**: Electronics, Fashion, Home, Beauty.
   - **City Filter**: Cairo, Giza, Alexandria.
   - **Payment Method Filter**: Credit Card, Cash, Wallet.
   - **Order Status Filter**: Completed, Cancelled.
   - **Reset Filters**: One-click filter reset with active count badge.
5. **Interactive Recharts Visualizers**:
   - **Revenue & Sales Trend**: Area / Line chart of daily sales over order dates.
   - **Revenue by Category**: Bar chart showing total sales revenue per category.
   - **Fulfillment Status**: Donut / Pie chart showing Completed vs Cancelled ratio.
   - **Geographic Distribution**: Bar chart showing order count by city.
   - **Payment Method Breakdown**: Bar chart showing order volume per payment channel.
6. **Orders Data Table**:
   - Live Search across Order ID, Customer, Category, Product, City, Payment Method, Status.
   - Multi-column Ascending and Descending sorting (Date, Sales, Qty, Order ID).
   - Status badges for Completed and Cancelled orders.
7. **Pagination**: Page size selection (5, 10, 20 items), first/previous/next/last jumps, and record range indicators.
8. **Dark / Light Theme Toggle**: Persistent dark/light mode preference stored in `localStorage`.
9. **Responsive Design**: Flawless layout across Desktop (1440px+), Tablet (768px), and Mobile (375px).

---

## Technologies Used

- **Core**: React 18, JavaScript (ES6+), Vite 6
- **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer, Glassmorphism, CSS Variables
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Excel Parser**: SheetJS (`xlsx`)

---

## Project Structure

```
ecommerce1-dashboard/
├── database.xlsx              # Original source Excel dataset (Project Root)
├── scripts/
│   └── excel-to-json.js       # Reusable Excel-to-JSON generator script
├── src/
│   ├── components/
│   │   ├── Charts/
│   │   │   └── ChartsSection.jsx
│   │   ├── DataTable/
│   │   │   └── DataTable.jsx
│   │   ├── Filters/
│   │   │   └── Filters.jsx
│   │   ├── KPICards/
│   │   │   └── KPICards.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Pagination/
│   │   │   └── Pagination.jsx
│   │   └── ThemeToggle/
│   │       └── ThemeToggle.jsx
│   ├── data/
│   │   └── data.json          # Generated runtime dataset (30 records)
│   ├── hooks/
│   │   └── useDashboard.js    # Custom dashboard state & filter hook
│   ├── utils/
│   │   └── dataProcessor.js   # Dynamic KPI, chart, and filter logic
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Global styles & design system
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                # Vercel SPA routing configuration
├── .gitignore
└── README.md
```

---

## Installation & Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ahmedshahat921-cpu/ecommerce-dashboard.git
cd ecommerce1-dashboard
npm install
```

### 2. Regenerate data.json from database.xlsx
```bash
npm run data:generate
```

### 3. Run Local Development Server
```bash
npm run dev
```

---

## Build & Local Preview Instructions

Before deploying to production, run the production build and test it locally:

```bash
# 1. Build production bundle
npm run build

# 2. Preview production build locally
npm run preview
```

---

## Dataset & Conversion Script Instructions

- **Source File**: `database.xlsx` at project root.
- **Conversion Utility**: `scripts/excel-to-json.js`.
- **How to Update Data**: Replace or edit `database.xlsx` at the project root, then run `npm run data:generate`. This reads the sheet and updates `src/data/data.json`.

---

## GitHub & Vercel Deployment

- **GitHub Repository**: [https://github.com/ahmedshahat921-cpu/ecommerce-dashboard.git](https://github.com/ahmedshahat921-cpu/ecommerce-dashboard.git)
- **Deployment Platform**: Vercel
- **Production Routing**: Configured via `vercel.json` for single page app (SPA) routing.
