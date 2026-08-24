import React from 'react';
import { Filter, RotateCcw, Calendar, Tag, MapPin, CreditCard, CheckCircle } from 'lucide-react';

export const Filters = ({
  filters,
  filterOptions,
  handleFilterChange,
  resetFilters,
  activeFilterCount
}) => {
  const { categories, cities, paymentMethods, orderStatuses } = filterOptions;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors space-y-4">
      {/* Header & Reset Button */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Interactive Filter Engine
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold shadow-sm">
                  {activeFilterCount}
                </span>
              )}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Refine analytics dynamically across real dataset dimensions
            </p>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            id="reset-filters-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Grid of Interactive Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* 1. Date Range: Start Date */}
        <div className="space-y-1">
          <label htmlFor="filter-start-date" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-blue-500" /> Start Date
          </label>
          <input
            type="date"
            id="filter-start-date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Date Range: End Date */}
        <div className="space-y-1">
          <label htmlFor="filter-end-date" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-blue-500" /> End Date
          </label>
          <input
            type="date"
            id="filter-end-date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          />
        </div>

        {/* 2. Category Filter */}
        <div className="space-y-1">
          <label htmlFor="filter-category" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Tag className="w-3 h-3 text-purple-500" /> Category
          </label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* 3. City Filter */}
        <div className="space-y-1">
          <label htmlFor="filter-city" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-500" /> City
          </label>
          <select
            id="filter-city"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          >
            <option value="ALL">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* 4. Payment Method Filter */}
        <div className="space-y-1">
          <label htmlFor="filter-payment" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <CreditCard className="w-3 h-3 text-emerald-500" /> Payment Method
          </label>
          <select
            id="filter-payment"
            value={filters.paymentMethod}
            onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          >
            <option value="ALL">All Payment Methods</option>
            {paymentMethods.map((pm) => (
              <option key={pm} value={pm}>{pm}</option>
            ))}
          </select>
        </div>

        {/* 5. Order Status Filter */}
        <div className="space-y-1 sm:col-span-2 md:col-span-1">
          <label htmlFor="filter-status" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-amber-500" /> Order Status
          </label>
          <select
            id="filter-status"
            value={filters.orderStatus}
            onChange={(e) => handleFilterChange('orderStatus', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          >
            <option value="ALL">All Statuses</option>
            {orderStatuses.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
