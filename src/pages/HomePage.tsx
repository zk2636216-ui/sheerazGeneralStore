import React from 'react';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Users,
  Store,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

import heroImg from '../assets/images/sheeraz_store_hero_1794452947740.jpg';
import communityImg from '../assets/images/sheeraz_store_community_1794453062423.jpg';

export const HomePage: React.FC = () => {
  const {
    products,
    categories,
    storeConfig,
    navigateTo,
    setIsSettingsOpen,
  } = useStore();

  const popularProducts = products.filter((p) => p.isPopular);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-100 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-stone-200 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-linear-to-r from-stone-50 via-stone-50/95 to-stone-50/80">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold w-fit mb-6 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>Serving Khattak Community</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-900 font-serif leading-[1.15] tracking-tight">
              Your Neighborhood Store,{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Made Easy
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
              Welcome to <strong className="text-emerald-950 font-semibold">{storeConfig.storeName}</strong>,
              proudly owned and managed by <strong className="text-stone-900">{storeConfig.owners.name1}</strong> and{' '}
              <strong className="text-stone-900">{storeConfig.owners.name2}</strong> in Khattak.
              Enjoy fresh kitchen supplies, chilled drinks, pantry grains, everyday hardware, and mobile top-ups with friendly local care.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span>Shop Now</span>
              </button>

              <button
                onClick={() => {
                  const elem = document.getElementById('featured-categories');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-semibold rounded-2xl border border-stone-300 shadow-xs hover:border-stone-400 transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>Browse Categories</span>
                <ChevronRight className="w-4 h-4 text-emerald-800" />
              </button>
            </div>

            {/* Quick community features */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Authentic Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Fair Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Local Pickup & Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-full">
            <img
              src={heroImg}
              alt="Sheeraz General Store storefront and interior with fresh goods in Khattak"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-lg text-xs text-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-800 shrink-0" />
                <span className="font-semibold text-stone-900">Sheeraz General Store</span>
                <span className="text-stone-700">• Khattak</span>
              </div>
              <span className="text-emerald-800 font-bold hidden sm:inline">Open 7 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section id="featured-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Explore The Aisle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Featured Store Categories
            </h2>
            <p className="text-sm text-stone-700 mt-1">
              Select any aisle to browse groceries, pantry spices, cold treats, and home utilities.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('category', cat.id as ProductCategory)}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-600/40 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 block">
                    {cat.itemCountNote}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg leading-tight drop-shadow-xs font-serif">
                    {cat.name}
                  </h3>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed">
                  {cat.shortDescription}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950 transition">
                  <span>Browse aisle</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner Area (Editable notice, no fake discounts) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left space-y-2">
              <span className="inline-block bg-amber-400 text-emerald-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Store Notice & Special Orders
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold font-serif">
                Need Bulk Daal, Rice Sacks or Event Beverages in Khattak?
              </h3>
              <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                Sheeraz General Store accepts advance orders for wedding supplies, bulk grains, party cold drinks, and wholesale packs. Contact Fahad Islam or Sadam Hussain directly or place your order online.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => navigateTo('contact')}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer"
              >
                Contact Store
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-5 py-3 bg-emerald-950/60 hover:bg-emerald-950 text-white font-medium text-xs sm:text-sm rounded-xl border border-emerald-600 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300" />
                <span>Edit Notice Text</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products / Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1.5">
              <Store className="w-4 h-4 text-amber-500" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Popular Everyday Essentials
            </h2>
            <p className="text-sm text-stone-700 mt-1">
              Sample inventory items commonly requested by families across Khattak.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition cursor-pointer"
          >
            <span>View All Items</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* About Our Store Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Community Image */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[460px]">
              <img
                src={communityImg}
                alt="Sheeraz General Store community grocery in Khattak"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-white/60 shadow-sm text-xs text-stone-800">
                <span className="font-semibold text-emerald-900">Khattak Local General Store</span>
                <p className="text-stone-700 text-[11px]">Serving neighborhood households with pride</p>
              </div>
            </div>

            {/* Description & Owners */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">
                  About Our Store
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif leading-tight">
                  Proudly Serving Khattak With Freshness & Care
                </h3>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                <strong>Sheeraz General Store</strong> is a local grocery and general store serving our neighborhood in <strong>Khattak</strong>. Founded on genuine community relationships, we strive to keep our shelves stocked with quality cooking essentials, cold beverages, treats for children, electrical fixtures, and convenient mobile balance services.
              </p>

              {/* Owners Box with Tasteful Initials Profiles (no fake photos) */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Store Management & Co-Owners
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-800 text-amber-300 font-serif font-bold text-lg flex items-center justify-center shrink-0 shadow-xs border-2 border-emerald-700">
                      FI
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">
                        {storeConfig.owners.name1}
                      </div>
                      <div className="text-xs text-emerald-800 font-medium">
                        Co-Owner • Store Operations
                      </div>
                      <div className="text-[11px] text-stone-700">Khattak Resident</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-900 text-amber-300 font-serif font-bold text-lg flex items-center justify-center shrink-0 shadow-xs border-2 border-emerald-800">
                      SH
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">
                        {storeConfig.owners.name2}
                      </div>
                      <div className="text-xs text-emerald-800 font-medium">
                        Co-Owner • Customer Relations
                      </div>
                      <div className="text-[11px] text-stone-700">Khattak Resident</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-xl transition cursor-pointer"
                >
                  Read Full Store Story &rarr;
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs sm:text-sm rounded-xl border border-stone-300 transition cursor-pointer"
                >
                  Visit Or Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Contact / Location Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-stone-900 font-serif">Store Location</h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {storeConfig.addressPlaceholder}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-700 font-medium">
              Community: <strong className="text-emerald-900">Khattak, KP</strong>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-stone-900 font-serif">Opening Hours</h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {storeConfig.openingHoursPlaceholder}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-emerald-800 font-semibold">
              Open 7 days a week for daily groceries
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-stone-900 font-serif">Call Or Message</h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-mono">
                {storeConfig.phonePlaceholder}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => navigateTo('contact')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition flex items-center gap-1 cursor-pointer"
              >
                <span>Send message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
