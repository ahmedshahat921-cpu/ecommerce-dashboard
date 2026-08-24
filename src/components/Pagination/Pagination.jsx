import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  setCurrentPage,
  setPageSize
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
      {/* Items Range & Page Size Selector */}
      <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
        <span>
          Showing <strong className="text-slate-900 dark:text-white font-bold">{startItem}</strong> to{' '}
          <strong className="text-slate-900 dark:text-white font-bold">{endItem}</strong> of{' '}
          <strong className="text-slate-900 dark:text-white font-bold">{totalItems}</strong> records
        </span>

        <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-4">
          <label htmlFor="page-size-select" className="text-[11px] font-medium">
            Rows per page:
          </label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          id="pagination-first-btn"
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          id="pagination-prev-btn"
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers Indicator */}
        <span className="px-3 py-1 text-xs font-bold text-slate-800 dark:text-slate-200">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Page */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage >= totalPages}
          id="pagination-next-btn"
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage >= totalPages}
          id="pagination-last-btn"
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
