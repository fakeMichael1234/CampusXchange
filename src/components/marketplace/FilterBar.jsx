import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { CATEGORIES, INDIAN_CAMPUSES } from '../../data/mockData';

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCampus,
  onCampusChange,
  selectedCondition,
  onConditionChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  postedTime,
  onPostedTimeChange,
  sortBy,
  onSortChange,
  onResetFilters,
}) => {
  const conditions = [
    'All Conditions',
    'Like New',
    'Excellent',
    'Good',
    'Fair'
  ];

  const timeOptions = [
    { label: 'Any Time', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Last 3 Days', value: '3days' },
    { label: 'Last 7 Days', value: '7days' },
  ];

  return (
    <div className="space-y-4 bg-cx-900/90 p-4 sm:p-5 rounded-cx-xl border border-cx-750 backdrop-blur-md shadow-cx-card-dark">
      
      {/* Search Input & Sort / Reset */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cx-400" />
          <input
            type="text"
            placeholder="Search products, textbooks, MacBooks, cycles, calculators..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-cx-950 border border-cx-700 text-cx-0 text-xs rounded-cx-md placeholder-cx-500 focus:outline-none focus:border-cx-0 font-sans"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-cx-950 border border-cx-700 text-cx-0 rounded-cx-md px-3 py-2 text-xs focus:outline-none focus:border-cx-0 cursor-pointer"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-asc">Sort: Price Low to High</option>
            <option value="price-desc">Sort: Price High to Low</option>
            <option value="popular">Sort: Most Relevant</option>
          </select>

          <button
            onClick={onResetFilters}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-cx-md bg-cx-950 border border-cx-750 text-cx-300 hover:text-cx-0 hover:border-cx-500 text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-cx-md text-xs font-medium whitespace-nowrap transition-all select-none ${
                isActive
                  ? "bg-cx-0 text-cx-950 font-bold"
                  : "bg-cx-950 text-cx-400 border border-cx-750 hover:text-cx-0 hover:border-cx-500"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Deep Filters Row: Campus, Condition, Price Range, Posted Time */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-cx-800 font-mono text-xs">
        {/* Campus Filter */}
        <div>
          <label className="text-[10px] text-cx-500 uppercase tracking-wider block mb-1">Campus</label>
          <select
            value={selectedCampus}
            onChange={(e) => onCampusChange(e.target.value)}
            className="w-full bg-cx-950 border border-cx-700 text-cx-0 rounded-cx-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-cx-0"
          >
            <option value="All Campuses">All Campuses</option>
            {INDIAN_CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Condition Filter */}
        <div>
          <label className="text-[10px] text-cx-500 uppercase tracking-wider block mb-1">Condition</label>
          <select
            value={selectedCondition}
            onChange={(e) => onConditionChange(e.target.value)}
            className="w-full bg-cx-950 border border-cx-700 text-cx-0 rounded-cx-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-cx-0"
          >
            {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-[10px] text-cx-500 uppercase tracking-wider block mb-1">Price Range (₹)</label>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice || ''}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-1/2 bg-cx-950 border border-cx-700 text-cx-0 px-2 py-1.5 rounded-cx-md text-xs focus:outline-none focus:border-cx-0"
            />
            <span className="text-cx-600">-</span>
            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice || ''}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-1/2 bg-cx-950 border border-cx-700 text-cx-0 px-2 py-1.5 rounded-cx-md text-xs focus:outline-none focus:border-cx-0"
            />
          </div>
        </div>

        {/* Posted Time Filter */}
        <div>
          <label className="text-[10px] text-cx-500 uppercase tracking-wider block mb-1">Posted Date</label>
          <select
            value={postedTime || 'all'}
            onChange={(e) => onPostedTimeChange(e.target.value)}
            className="w-full bg-cx-950 border border-cx-700 text-cx-0 rounded-cx-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-cx-0"
          >
            {timeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

    </div>
  );
};
