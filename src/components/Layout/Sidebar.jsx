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

export const Sidebar = ({
  totalRecords,
  activeFilterCount,
  resetFilters,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen
}) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  const navItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      href: '#overview',
      icon: LayoutDashboard,
      iconColor: 'text-blue-500'
    },
    {
      id: 'kpis',
      label: 'Dynamic KPIs',
      href: '#overview',
      icon: TrendingUp,
      iconColor: 'text-emerald-500'
    },
    {
      id: 'charts',
      label: 'Analytical Charts',
      href: '#charts',
      icon: PieChart,
      iconColor: 'text-purple-500'
    },
    {
      id: 'table',
      label: 'Orders Dataset Table',
      href: '#table',
      icon: Table,
      iconColor: 'text-amber-500'
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Top Group: Navigation & Dataset Details */}
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 px-2">
            Analytics Views
          </h3>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/90 dark:bg-blue-950/70 border border-blue-200/90 dark:border-blue-800/90 shadow-sm shadow-blue-500/10 ring-1 ring-blue-500/30'
                      : 'font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : item.iconColor}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Dataset Metadata Box */}
        <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Source Excel Details
            </h4>
          </div>
          
          <div className="space-y-2.5 text-[11px]">
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
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-[10px] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified 1:1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Group: Dataset Fields & Filter Action */}
      <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 mt-auto">
        <div className="px-1 space-y-2">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Dataset Fields
          </h4>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700/60">
              <Calendar className="w-3 h-3 text-blue-500" /> Date Range
            </span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700/60">
              <MapPin className="w-3 h-3 text-rose-500" /> Cities
            </span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700/60">
              <CreditCard className="w-3 h-3 text-indigo-500" /> Payments
            </span>
          </div>
        </div>

        {/* Active Filter Control Button */}
        {activeFilterCount > 0 && (
          <button
            onClick={() => {
              resetFilters();
              if (setIsMobileSidebarOpen) setIsMobileSidebarOpen(false);
            }}
            className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800 transition-all text-center"
          >
            Clear Active Filters ({activeFilterCount})
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="w-64 shrink-0 hidden md:block border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4 transition-colors h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
        <div className="h-full">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Mobile Sidebar Slide-over Drawer */}
      <aside
        className={`fixed top-16 left-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="h-full">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
};
