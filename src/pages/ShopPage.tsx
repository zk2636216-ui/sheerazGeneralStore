import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, ArrowUpDown, Check, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

export const ShopPage: React.FC = () => {
  const { products, categories, searchQuery, setSearchQuery, selectedCategory, navigateTo } =
    useStore();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>(
    selectedCategory || 'all'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredList = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategoryFilter !== 'all' && p.category !== activeCategoryFilter) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchBrand = p.brand?.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchBrand && !matchCat) return false;
        }
        // Stock filter
        if (onlyInStock && !p.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [products, activeCategoryFilter, searchQuery, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setActiveCategoryFilter('all');
    setSearchQuery('');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Breadcrumbs */}
      <div>
        <div className="text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1.5">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-emerald-800 transition cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-bold">Shop All</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          Shop All Products
        </h1>
        <p className="text-sm text-stone-700 mt-1 max-w-2xl">
          Browse the complete catalog at Sheeraz General Store. Find cold beverages, fresh spices, tea-time snacks, grains, home electrical items, and mobile vouchers.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition cursor-pointer ${
              activeCategoryFilter === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Items ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition cursor-pointer ${
                activeCategoryFilter === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Secondary controls: Search, Sort, In-Stock, Reset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search by name, brand, or spice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-600 focus:outline-hidden focus:border-emerald-600 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-stone-600 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-700" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 text-xs text-stone-800 font-medium focus:outline-hidden focus:border-emerald-600"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Product Name (A-Z)</option>
              </select>
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-1.5 text-xs text-stone-700 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded-sm border-stone-300 text-emerald-800 focus:ring-emerald-600 w-3.5 h-3.5"
              />
              <span>In-Stock Only</span>
            </label>

            {/* Reset button if filter is active */}
            {(activeCategoryFilter !== 'all' || searchQuery || onlyInStock || sortBy !== 'featured') && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-700">
        <span>
          Showing <strong className="text-stone-900 font-semibold">{filteredList.length}</strong> items
          {activeCategoryFilter !== 'all' && (
            <span> in <span className="text-emerald-800 font-semibold">{categories.find((c) => c.id === activeCategoryFilter)?.name}</span></span>
          )}
        </span>
      </div>

      {/* Product Grid */}
      {filteredList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-serif">
            No matching items found
          </h3>
          <p className="text-xs text-stone-700 mt-1 max-w-sm mx-auto">
            Try searching for something else or reset your category and search filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
