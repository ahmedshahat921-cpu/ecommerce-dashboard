import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-semibold shadow-sm"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle Theme"
      id="theme-toggle-btn"
    >
      {isDarkMode ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-indigo-500" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </button>
  );
};
