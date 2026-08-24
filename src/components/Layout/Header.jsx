import React from 'react';
import { Search, X, BarChart3, Database, Filter } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

export const Header = ({
  searchQuery,
  handleSearch,
  activeFilterCount,
  totalRecords,
  filteredRecordsCount,
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Page Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              E-Commerce Analytics
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-ping"></span>
                Verified Dataset
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Real-time telemetry parsed from <code className="text-blue-600 dark:text-blue-400 font-mono text-[11px]">database.xlsx</code>
            </p>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search orders, customers, categories, products..."
              className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dataset Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700 font-medium">
            <Database className="w-3.5 h-3.5 text-blue-500" />
            <span>{filteredRecordsCount} / {totalRecords} records</span>
          </div>

          {/* Active Filter Indicator */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800">
              <Filter className="w-3.5 h-3.5" />
              <span>{activeFilterCount} Active</span>
            </div>
          )}

          {/* Theme Switcher */}
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
};
