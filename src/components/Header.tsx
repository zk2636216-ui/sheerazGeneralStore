import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Phone,
  MapPin,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  Clock,
  Store,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const {
    currentRoute,
    selectedCategory,
    navigateTo,
    cartTotalCount,
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    storeConfig,
    setIsSettingsOpen,
    categories,
    setQuickViewProduct,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(e.target as Node)
      ) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    navigateTo('shop');
  };

  const selectCategory = (catId: ProductCategory) => {
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    navigateTo('category', catId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
      {/* Announcement Strip */}
      <div className="bg-emerald-800 text-emerald-50 text-xs sm:text-sm py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-flex items-center justify-center bg-amber-400 text-emerald-950 text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              Store Notice
            </span>
            <span className="truncate">{storeConfig.announcementText}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-emerald-100 text-xs">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-white underline underline-offset-2 decoration-amber-300/50 hover:decoration-white font-medium transition cursor-pointer"
              title="Edit store phone, address, and announcement placeholders"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Edit Store Details</span>
            </button>
            <span className="hidden md:inline opacity-40">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-100/90">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>{storeConfig.openingHoursPlaceholder.split('(')[0]}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Logo & Store Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('home');
              }}
              className="group flex items-center gap-3 text-left cursor-pointer focus:outline-hidden"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white flex items-center justify-center shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform">
                <Store className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 font-serif block leading-none">
                  Sheeraz <span className="text-emerald-700">General Store</span>
                </span>
                <span className="text-xs text-stone-700 font-medium tracking-wider uppercase mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-700 inline" />
                  {storeConfig.locationArea} Community Shop
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div
            ref={searchContainerRef}
            className="hidden md:block flex-1 max-w-md mx-4 relative"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search Pepsi, spices, daal, snacks, electrical..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-full text-sm text-stone-900 placeholder:text-stone-600 focus:outline-hidden focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10 transition"
              />
              <Search className="w-4 h-4 text-stone-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-900 text-xs cursor-pointer p-1"
                >
                  Clear
                </button>
              )}
            </form>

            {/* Live Search Autocomplete Dropdown */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-xs text-stone-700">
                  <span>Results for "{searchQuery}"</span>
                  <span className="font-semibold text-emerald-800">
                    {filteredProducts.length} items found
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                  {filteredProducts.slice(0, 5).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSearchFocused(false);
                        setQuickViewProduct(p);
                      }}
                      className="w-full text-left p-3 hover:bg-emerald-50/60 flex items-center gap-3 transition cursor-pointer"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-stone-900 truncate">
                          {p.name}
                        </div>
                        <div className="text-xs text-stone-700">{p.unit}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-emerald-800">
                          Rs. {p.price}
                        </div>
                        <span className="text-[10px] text-amber-700 font-medium">Quick View</span>
                      </div>
                    </button>
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="p-6 text-center text-sm text-stone-700">
                      No matching items found for "{searchQuery}".
                    </div>
                  )}
                </div>
                {filteredProducts.length > 5 && (
                  <button
                    onClick={() => {
                      setSearchFocused(false);
                      navigateTo('shop');
                    }}
                    className="w-full py-2.5 text-center text-xs font-semibold text-emerald-800 hover:bg-emerald-50 border-t border-stone-100 transition cursor-pointer block"
                  >
                    View all {filteredProducts.length} matching products &rarr;
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-stone-700">
              <button
                onClick={() => navigateTo('home')}
                className={`px-3 py-2 rounded-lg transition cursor-pointer ${
                  currentRoute === 'home'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className={`px-3 py-2 rounded-lg transition cursor-pointer ${
                  currentRoute === 'shop'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                Shop All
              </button>

              {/* Categories Dropdown */}
              <div ref={categoriesRef} className="relative">
                <button
                  onClick={() => setCategoriesDropdownOpen((prev) => !prev)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-1 transition cursor-pointer ${
                    currentRoute === 'category'
                      ? 'text-emerald-800 bg-emerald-50 font-semibold'
                      : 'hover:text-emerald-800 hover:bg-stone-50'
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      categoriesDropdownOpen ? 'rotate-180 text-emerald-800' : ''
                    }`}
                  />
                </button>

                {categoriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-stone-100 text-xs font-semibold text-stone-600 uppercase tracking-wider">
                      Browse Store Aisles
                    </div>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => selectCategory(cat.id)}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-emerald-50/70 transition cursor-pointer ${
                          currentRoute === 'category' && selectedCategory === cat.id
                            ? 'text-emerald-900 font-semibold bg-emerald-50'
                            : 'text-stone-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[11px] text-stone-600">
                          {cat.itemCountNote}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigateTo('about')}
                className={`px-3 py-2 rounded-lg transition cursor-pointer ${
                  currentRoute === 'about'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className={`px-3 py-2 rounded-lg transition cursor-pointer ${
                  currentRoute === 'contact'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow-xs hover:shadow-md transition cursor-pointer font-medium text-sm"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              <span className="bg-amber-400 text-emerald-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                {cartTotalCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2.5 text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-xl transition cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar row */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search items in Sheeraz General Store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-full text-xs text-stone-900 placeholder:text-stone-600 focus:outline-hidden focus:border-emerald-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-stone-600 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('home');
                }}
                className={`p-2.5 rounded-xl text-center text-sm font-semibold transition ${
                  currentRoute === 'home'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('shop');
                }}
                className={`p-2.5 rounded-xl text-center text-sm font-semibold transition ${
                  currentRoute === 'shop'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                Shop All
              </button>
            </div>

            <div>
              <div className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2 px-1">
                Store Categories
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => selectCategory(cat.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition ${
                      currentRoute === 'category' && selectedCategory === cat.id
                        ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-300'
                        : 'bg-stone-50/80 text-stone-700 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('about');
                }}
                className="w-full text-left p-2.5 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 flex items-center justify-between"
              >
                <span>About Us (Owners & Khattak Shop)</span>
                <ArrowRight className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('contact');
                }}
                className="w-full text-left p-2.5 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 flex items-center justify-between"
              >
                <span>Contact & Store Location</span>
                <ArrowRight className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSettingsOpen(true);
                }}
                className="w-full text-left p-2.5 rounded-xl text-sm font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Edit Store Placeholders & Settings
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="bg-stone-50 rounded-2xl p-3 text-xs text-stone-700 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span className="truncate">{storeConfig.addressPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span>{storeConfig.phonePlaceholder}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
