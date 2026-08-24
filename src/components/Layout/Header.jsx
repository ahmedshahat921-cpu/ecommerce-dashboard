import React from 'react';
import { Search, X, BarChart3, Database, Filter, Menu } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

export const Header = ({
  searchQuery,
  handleSearch,
  activeFilterCount,
  totalRecords,
  filteredRecordsCount,
  isDarkMode,
  toggleTheme,
  isMobileSidebarOpen,
  toggleMobileSidebar
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile Hamburger Toggle & Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            aria-label="Toggle Navigation Sidebar"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="hidden min-[400px]:block">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              E-Commerce Analytics
            </h1>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search dataset..."
              className="w-full pl-9 pr-7 sm:pr-8 py-1.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Dataset Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700 font-medium">
            <Database className="w-3.5 h-3.5 text-blue-500" />
            <span>{filteredRecordsCount} / {totalRecords}</span>
          </div>

          {/* Active Filter Indicator */}
          {activeFilterCount > 0 && (
            <div className="hidden min-[480px]:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800">
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
