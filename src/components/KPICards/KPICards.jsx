import React from 'react';
import {
  DollarSign,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/dataProcessor';

export const KPICards = ({ kpiMetrics }) => {
  const {
    totalSales,
    totalOrders,
    completedOrders,
    completedRate,
    cancelledOrders,
    cancelledRate,
    avgOrderValue,
    totalQuantity
  } = kpiMetrics;

  const cards = [
    {
      id: 'kpi-total-sales',
      title: 'Total Sales',
      value: formatCurrency(totalSales),
      subtitle: `${formatNumber(totalOrders)} orders calculated`,
      icon: DollarSign,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      borderColor: 'border-blue-200 dark:border-blue-800/60'
    },
    {
      id: 'kpi-total-orders',
      title: 'Total Orders',
      value: formatNumber(totalOrders),
      subtitle: 'Recorded orders count',
      icon: ShoppingBag,
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
      borderColor: 'border-purple-200 dark:border-purple-800/60'
    },
    {
      id: 'kpi-completed-orders',
      title: 'Completed Orders',
      value: formatNumber(completedOrders),
      subtitle: `${completedRate} completion rate`,
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-200 dark:border-emerald-800/60'
    },
    {
      id: 'kpi-cancelled-orders',
      title: 'Cancelled Orders',
      value: formatNumber(cancelledOrders),
      subtitle: `${cancelledRate} cancellation rate`,
      icon: XCircle,
      color: 'from-rose-500 to-red-600',
      textColor: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      borderColor: 'border-rose-200 dark:border-rose-800/60'
    },
    {
      id: 'kpi-avg-order-value',
      title: 'Average Order Value',
      value: formatCurrency(avgOrderValue),
      subtitle: 'Revenue per transaction',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      borderColor: 'border-amber-200 dark:border-amber-800/60'
    },
    {
      id: 'kpi-total-quantity',
      title: 'Total Quantity Sold',
      value: `${formatNumber(totalQuantity)} Units`,
      subtitle: 'Product volume total',
      icon: PackageCheck,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
      borderColor: 'border-cyan-200 dark:border-cyan-800/60'
    }
  ];

  return (
    <section id="kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            id={card.id}
            className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border ${card.borderColor} shadow-sm card-hover flex flex-col justify-between transition-all`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-md`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {card.value}
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
