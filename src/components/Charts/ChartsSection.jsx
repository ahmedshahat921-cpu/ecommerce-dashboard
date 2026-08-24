import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  getSalesOverTime,
  getSalesByCategory,
  getOrdersByStatus,
  getOrdersByCity,
  getPaymentMethodData,
  formatCurrency
} from '../../utils/dataProcessor';

export const ChartsSection = ({ dataset, isDarkMode }) => {
  const salesOverTimeData = getSalesOverTime(dataset);
  const salesByCategoryData = getSalesByCategory(dataset);
  const ordersByStatusData = getOrdersByStatus(dataset);
  const ordersByCityData = getOrdersByCity(dataset);
  const paymentMethodData = getPaymentMethodData(dataset);

  const gridColor = isDarkMode ? '#334155' : '#e2e8f0';
  const textColor = isDarkMode ? '#94a3b8' : '#64748b';
  const tooltipBg = isDarkMode ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDarkMode ? '#334155' : '#cbd5e1';

  const PIE_COLORS = ['#10b981', '#f43f5e', '#3b82f6', '#f59e0b'];

  const CustomTooltip = ({ active, payload, label, isCurrency = false }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 rounded-xl shadow-xl text-xs font-semibold border backdrop-blur-md"
          style={{ backgroundColor: tooltipBg, borderColor: tooltipBorder }}
        >
          <p className="text-slate-500 dark:text-slate-400 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-bold">
              {entry.name}: {isCurrency ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!dataset || dataset.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
          No chart data available for the active filter set.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Try resetting or adjusting your filter selection to visualize data trends.
        </p>
      </div>
    );
  }

  return (
    <section id="charts" className="space-y-6">
      {/* 1. Sales Trend Over Time (Full Width Area Chart) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Revenue & Sales Trend Over Time
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Aggregated daily Total Sales ($) computed from order dates
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800">
            Line / Area Trend
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesOverTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" stroke={textColor} fontSize={11} />
              <YAxis stroke={textColor} fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
              <Tooltip content={<CustomTooltip isCurrency={true} />} />
              <Area
                type="monotone"
                dataKey="Sales"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#salesGrad)"
                name="Total Sales"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of 2 Charts: Category Bar & Status Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Sales by Category (Bar Chart) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Revenue by Product Category
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Total sales revenue ($) per category
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="category" stroke={textColor} fontSize={11} />
                <YAxis stroke={textColor} fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip content={<CustomTooltip isCurrency={true} />} />
                <Bar dataKey="Sales" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Total Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Orders by Status (Pie / Donut Chart) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Order Fulfillment Status Distribution
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Completed vs Cancelled orders breakdown
            </p>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={ordersByStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="status"
                  label={({ status, percent }) => `${status}: ${(percent * 100).toFixed(0)}%`}
                >
                  {ordersByStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid of 2 Charts: City Distribution & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4. Orders by City (Bar Chart) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Geographic Orders by City
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Distribution across Cairo, Giza, Alexandria
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersByCityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="city" stroke={textColor} fontSize={11} />
                <YAxis stroke={textColor} fontSize={11} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Orders" fill="#ec4899" radius={[6, 6, 0, 0]} name="Orders Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Payment Methods Breakdown (Bar Chart) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Payment Method Breakdown
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Orders volume by Credit Card, Cash, Wallet
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentMethodData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="method" stroke={textColor} fontSize={11} />
                <YAxis stroke={textColor} fontSize={11} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Orders" fill="#10b981" radius={[6, 6, 0, 0]} name="Orders Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
