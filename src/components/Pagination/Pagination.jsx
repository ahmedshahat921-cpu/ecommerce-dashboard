import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { CustomSelect } from '../CustomSelect/CustomSelect';

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
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 transition-colors">
      {/* Items Range & Page Size Selector */}
      <div className="w-full sm:w-auto flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4 text-xs text-slate-600 dark:text-slate-400">
        <span className="shrink-0 font-medium">
          Showing <strong className="text-slate-900 dark:text-white font-bold">{startItem}</strong> to{' '}
          <strong className="text-slate-900 dark:text-white font-bold">{endItem}</strong> of{' '}
          <strong className="text-slate-900 dark:text-white font-bold">{totalItems}</strong> records
        </span>

        <div className="flex items-center gap-2 sm:border-l sm:border-slate-200 sm:dark:border-slate-800 sm:pl-4 shrink-0">
          <label htmlFor="page-size-select" className="text-[11px] font-medium shrink-0">
            Rows per page:
          </label>
          <CustomSelect
            id="page-size-select"
            value={pageSize}
            onChange={(val) => {
              setPageSize(Number(val));
              setCurrentPage(1);
            }}
            options={[5, 10, 20, 50]}
            className="w-20"
            popoverPosition="top"
          />
        </div>
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t border-slate-100 dark:border-slate-800 sm:border-t-0">
        {/* First Page */}
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          id="pagination-first-btn"
          className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          id="pagination-prev-btn"
          className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers Indicator */}
        <span className="px-3 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 shrink-0">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Page */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage >= totalPages}
          id="pagination-next-btn"
          className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage >= totalPages}
          id="pagination-last-btn"
          className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
