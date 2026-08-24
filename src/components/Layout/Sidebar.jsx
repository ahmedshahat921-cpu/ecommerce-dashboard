import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  Table,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  MapPin,
  CreditCard
} from 'lucide-react';

export const Sidebar = ({ totalRecords, activeFilterCount, resetFilters }) => {
  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4 transition-colors min-h-[calc(100vh-4rem)]">
      <div className="space-y-6 sticky top-20">
        {/* Navigation Section */}
        <div>
          <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-2">
            Analytics Views
          </h3>
          <nav className="space-y-1">
            <a
              href="#overview"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </a>
            <a
              href="#kpis"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
            >
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Dynamic KPIs</span>
            </a>
            <a
              href="#charts"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
            >
              <PieChart className="w-4 h-4 text-purple-500" />
              <span>Analytical Charts</span>
            </a>
            <a
              href="#table"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
            >
              <Table className="w-4 h-4 text-amber-500" />
              <span>Orders Dataset Table</span>
            </a>
          </nav>
        </div>

        {/* Dataset Metadata Box */}
        <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Source Excel Details
            </h4>
          </div>
          
          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400 font-medium">File:</span>
              <code className="text-blue-600 dark:text-blue-400 font-mono font-semibold">database.xlsx</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Sheet:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Sheet1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Total Rows:</span>
              <span className="font-bold text-slate-900 dark:text-white">{totalRecords} records</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-[10px] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified 1:1
              </span>
            </div>
          </div>
        </div>

        {/* Quick Filter Attributes Summary */}
        <div className="px-2 space-y-2">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Dataset Fields
          </h4>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-blue-500" /> Date Range
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-500" /> Cities
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-indigo-500" /> Payments
            </span>
          </div>
        </div>

        {/* Active Filter Control Button */}
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800 transition-all text-center"
          >
            Clear Active Filters ({activeFilterCount})
          </button>
        )}
      </div>
    </aside>
  );
};
