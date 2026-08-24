import { useState, useEffect, useMemo } from 'react';
import rawData from '../data/data.json';
import { filterDataset, sortDataset, calculateKPIs } from '../utils/dataProcessor';

export const useDashboard = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Filter State
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'ALL',
    city: 'ALL',
    paymentMethod: 'ALL',
    orderStatus: 'ALL',
  });

  // Search & Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('Order_Date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sync theme with DOM document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Reset filter page when filters or search change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      category: 'ALL',
      city: 'ALL',
      paymentMethod: 'ALL',
      orderStatus: 'ALL',
    });
    setSearchQuery('');
    setSortField('Order_Date');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  // Extract unique filter options dynamically from raw dataset
  const filterOptions = useMemo(() => {
    const categories = Array.from(new Set(rawData.map((d) => d.Category).filter(Boolean))).sort();
    const cities = Array.from(new Set(rawData.map((d) => d.City).filter(Boolean))).sort();
    const paymentMethods = Array.from(new Set(rawData.map((d) => d.Payment_Method).filter(Boolean))).sort();
    const orderStatuses = Array.from(new Set(rawData.map((d) => d.Order_Status).filter(Boolean))).sort();

    return {
      categories,
      cities,
      paymentMethods,
      orderStatuses,
    };
  }, []);

  // Compute filtered dataset
  const filteredData = useMemo(() => {
    return filterDataset(rawData, filters, searchQuery);
  }, [filters, searchQuery]);

  // Compute sorted dataset
  const sortedData = useMemo(() => {
    return sortDataset(filteredData, sortField, sortOrder);
  }, [filteredData, sortField, sortOrder]);

  // Compute paginated dataset
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Compute KPIs dynamically
  const kpiMetrics = useMemo(() => {
    return calculateKPIs(filteredData);
  }, [filteredData]);

  // Total Pages
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));

  // Count of active non-default filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    if (filters.category !== 'ALL') count++;
    if (filters.city !== 'ALL') count++;
    if (filters.paymentMethod !== 'ALL') count++;
    if (filters.orderStatus !== 'ALL') count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [filters, searchQuery]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    rawDataset: rawData,
    filteredData,
    sortedData,
    paginatedData,
    kpiMetrics,
    filters,
    searchQuery,
    sortField,
    sortOrder,
    currentPage,
    pageSize,
    totalPages,
    activeFilterCount,
    filterOptions,
    isDarkMode,
    toggleTheme,
    handleFilterChange,
    handleSearch,
    resetFilters,
    handleSort,
    setCurrentPage,
    setPageSize,
  };
};
