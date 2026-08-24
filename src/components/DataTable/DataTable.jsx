import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Calendar, CreditCard, MapPin, Tag, CheckCircle2, XCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/dataProcessor';

export const DataTable = ({
  dataset,
  sortField,
  sortOrder,
  handleSort
}) => {
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return (
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 opacity-50 group-hover:opacity-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-all shrink-0 ml-1" />
      );
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 font-bold shrink-0 ml-1" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 font-bold shrink-0 ml-1" />
    );
  };

  const headers = [
    { key: 'Order_ID', label: 'Order ID' },
    { key: 'Order_Date', label: 'Date' },
    { key: 'Customer', label: 'Customer' },
    { key: 'Category', label: 'Category' },
    { key: 'Product', label: 'Product' },
    { key: 'Quantity', label: 'Qty' },
    { key: 'Unit_Price', label: 'Unit Price' },
    { key: 'Total_Sales', label: 'Total Sales' },
    { key: 'Payment_Method', label: 'Payment' },
    { key: 'Order_Status', label: 'Status' },
    { key: 'City', label: 'City' }
  ];

  return (
    <div id="table" className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Orders Dataset
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-semibold border border-slate-200 dark:border-slate-700">
              {dataset.length} items shown
            </span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Click column headers to sort dataset ascending or descending
          </p>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[850px]">
          <thead className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80 transition-colors">
            <tr className="text-[11px] font-bold tracking-wide uppercase">
              {headers.map((head) => {
                const isActive = sortField === head.key;
                return (
                  <th
                    key={head.key}
                    onClick={() => handleSort(head.key)}
                    className={`px-4 py-3 cursor-pointer group select-none transition-colors ${
                      isActive
                        ? 'bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>{head.label}</span>
                      {renderSortIcon(head.key)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
            {dataset.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-400 dark:text-slate-500">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">No records match your active search & filter query.</p>
                    <p className="text-xs">Try clearing filters to inspect all database.xlsx records.</p>
                  </div>
                </td>
              </tr>
            ) : (
              dataset.map((row, idx) => (
                <tr
                  key={`${row.Order_ID}-${idx}`}
                  className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Order ID */}
                  <td className="px-4 py-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {row.Order_ID}
                  </td>

                  {/* Order Date */}
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-slate-600 dark:text-slate-400">
                    {row.Order_Date}
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {row.Customer}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-medium text-[11px] border border-purple-200 dark:border-purple-800/60">
                      {row.Category}
                    </span>
                  </td>

                  {/* Product */}
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {row.Product}
                  </td>

                  {/* Quantity */}
                  <td className="px-4 py-3 font-bold text-center">
                    {row.Quantity}
                  </td>

                  {/* Unit Price */}
                  <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                    {formatCurrency(row.Unit_Price)}
                  </td>

                  {/* Total Sales */}
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(row.Total_Sales)}
                  </td>

                  {/* Payment Method */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                      {row.Payment_Method}
                    </span>
                  </td>

                  {/* Order Status Badge */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.Order_Status === 'Completed' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-[11px] font-bold border border-rose-200 dark:border-rose-800">
                        <XCircle className="w-3 h-3 text-rose-500" /> Cancelled
                      </span>
                    )}
                  </td>

                  {/* City */}
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-600 dark:text-slate-400">
                    {row.City}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
