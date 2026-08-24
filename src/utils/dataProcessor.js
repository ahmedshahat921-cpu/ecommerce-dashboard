/**
 * Data Processing Utility Functions for E-Commerce Dashboard
 * All calculations operate strictly on the dynamically provided dataset.
 */

// Format numbers to USD / Currency format
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

// Format numbers with commas
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num || 0);
};

/**
 * Filter dataset based on active filter state
 */
export const filterDataset = (data, filters, searchQuery) => {
  if (!Array.isArray(data)) return [];

  return data.filter((item) => {
    // 1. Date Range Filter
    if (filters.startDate && item.Order_Date < filters.startDate) return false;
    if (filters.endDate && item.Order_Date > filters.endDate) return false;

    // 2. Category Filter
    if (filters.category && filters.category !== 'ALL' && item.Category !== filters.category) {
      return false;
    }

    // 3. City Filter
    if (filters.city && filters.city !== 'ALL' && item.City !== filters.city) {
      return false;
    }

    // 4. Payment Method Filter
    if (filters.paymentMethod && filters.paymentMethod !== 'ALL' && item.Payment_Method !== filters.paymentMethod) {
      return false;
    }

    // 5. Order Status Filter
    if (filters.orderStatus && filters.orderStatus !== 'ALL' && item.Order_Status !== filters.orderStatus) {
      return false;
    }

    // 6. Search Query Filter
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      const matchId = String(item.Order_ID || '').toLowerCase().includes(query);
      const matchCustomer = String(item.Customer || '').toLowerCase().includes(query);
      const matchCategory = String(item.Category || '').toLowerCase().includes(query);
      const matchProduct = String(item.Product || '').toLowerCase().includes(query);
      const matchCity = String(item.City || '').toLowerCase().includes(query);
      const matchPayment = String(item.Payment_Method || '').toLowerCase().includes(query);
      const matchStatus = String(item.Order_Status || '').toLowerCase().includes(query);

      if (!matchId && !matchCustomer && !matchCategory && !matchProduct && !matchCity && !matchPayment && !matchStatus) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort dataset
 */
export const sortDataset = (data, sortField, sortOrder = 'asc') => {
  if (!Array.isArray(data)) return [];
  const sorted = [...data];

  sorted.sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (valA === undefined || valA === null) valA = '';
    if (valB === undefined || valB === null) valB = '';

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }

    valA = String(valA).toLowerCase();
    valB = String(valB).toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Calculate dynamic KPIs from dataset
 */
export const calculateKPIs = (dataset) => {
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return {
      totalSales: 0,
      totalOrders: 0,
      completedOrders: 0,
      completedRate: '0%',
      cancelledOrders: 0,
      cancelledRate: '0%',
      avgOrderValue: 0,
      totalQuantity: 0
    };
  }

  const totalOrders = dataset.length;
  let totalSales = 0;
  let completedOrders = 0;
  let cancelledOrders = 0;
  let totalQuantity = 0;

  dataset.forEach((item) => {
    totalSales += Number(item.Total_Sales) || 0;
    totalQuantity += Number(item.Quantity) || 0;

    if (item.Order_Status === 'Completed') {
      completedOrders++;
    } else if (item.Order_Status === 'Cancelled') {
      cancelledOrders++;
    }
  });

  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  const completedRate = totalOrders > 0 ? `${((completedOrders / totalOrders) * 100).toFixed(1)}%` : '0%';
  const cancelledRate = totalOrders > 0 ? `${((cancelledOrders / totalOrders) * 100).toFixed(1)}%` : '0%';

  return {
    totalSales,
    totalOrders,
    completedOrders,
    completedRate,
    cancelledOrders,
    cancelledRate,
    avgOrderValue,
    totalQuantity
  };
};

/**
 * Aggregate Chart Data: Sales Over Time
 */
export const getSalesOverTime = (dataset) => {
  if (!Array.isArray(dataset)) return [];
  const map = {};

  dataset.forEach((item) => {
    const date = item.Order_Date || 'Unknown';
    if (!map[date]) {
      map[date] = { date, Sales: 0, Orders: 0 };
    }
    map[date].Sales += Number(item.Total_Sales) || 0;
    map[date].Orders += 1;
  });

  return Object.values(map).sort((a, b) => (a.date < b.date ? -1 : 1));
};

/**
 * Aggregate Chart Data: Sales by Category
 */
export const getSalesByCategory = (dataset) => {
  if (!Array.isArray(dataset)) return [];
  const map = {};

  dataset.forEach((item) => {
    const category = item.Category || 'Other';
    if (!map[category]) {
      map[category] = { category, Sales: 0, Orders: 0 };
    }
    map[category].Sales += Number(item.Total_Sales) || 0;
    map[category].Orders += 1;
  });

  return Object.values(map).sort((a, b) => b.Sales - a.Sales);
};

/**
 * Aggregate Chart Data: Orders by Status
 */
export const getOrdersByStatus = (dataset) => {
  if (!Array.isArray(dataset)) return [];
  const map = {};

  dataset.forEach((item) => {
    const status = item.Order_Status || 'Unknown';
    if (!map[status]) {
      map[status] = { status, count: 0 };
    }
    map[status].count += 1;
  });

  return Object.values(map);
};

/**
 * Aggregate Chart Data: Orders by City
 */
export const getOrdersByCity = (dataset) => {
  if (!Array.isArray(dataset)) return [];
  const map = {};

  dataset.forEach((item) => {
    const city = item.City || 'Unknown';
    if (!map[city]) {
      map[city] = { city, Orders: 0, Sales: 0 };
    }
    map[city].Orders += 1;
    map[city].Sales += Number(item.Total_Sales) || 0;
  });

  return Object.values(map).sort((a, b) => b.Orders - a.Orders);
};

/**
 * Aggregate Chart Data: Payment Methods
 */
export const getPaymentMethodData = (dataset) => {
  if (!Array.isArray(dataset)) return [];
  const map = {};

  dataset.forEach((item) => {
    const method = item.Payment_Method || 'Other';
    if (!map[method]) {
      map[method] = { method, Orders: 0, Sales: 0 };
    }
    map[method].Orders += 1;
    map[method].Sales += Number(item.Total_Sales) || 0;
  });

  return Object.values(map).sort((a, b) => b.Orders - a.Orders);
};
