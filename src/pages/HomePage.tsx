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
  Award,
  Star,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

import heroImg from '../assets/images/sheeraz_store_hero_1794452947740.jpg';
import communityImg from '../assets/images/sheeraz_store_community_1794453062423.jpg';
import fahadImg from '../assets/images/fahad_islam_portrait_1794454111359.jpg';
import sadamImg from '../assets/images/sadam_hussain_portrait_1794454126081.jpg';

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
    <div className="space-y-12 sm:space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-100 rounded-2xl sm:rounded-3xl mx-3 sm:mx-6 lg:mx-8 border border-stone-200 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[540px]">
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-16 flex flex-col justify-center relative z-10 bg-linear-to-r from-stone-50 via-stone-50/95 to-stone-50/80">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold w-fit mb-4 sm:mb-6 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>Serving Khattak Community</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-serif leading-[1.18] tracking-tight">
              Your Neighborhood Store,{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Made Easy
              </span>
            </h1>

            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-stone-700 leading-relaxed font-sans">
              Welcome to <strong className="text-emerald-950 font-semibold">{storeConfig.storeName}</strong>,
              proudly owned and managed by <strong className="text-stone-900">{storeConfig.owners.name1}</strong> and{' '}
              <strong className="text-stone-900">{storeConfig.owners.name2}</strong> in Khattak.
              Enjoy fresh kitchen supplies, chilled drinks, pantry grains, everyday hardware, and mobile top-ups with friendly local care.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateTo('shop')}
                className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm md:text-base"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                <span>Shop Now</span>
              </button>

              <button
                onClick={() => {
                  const elem = document.getElementById('featured-categories');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-3 bg-white hover:bg-stone-50 text-stone-800 font-semibold rounded-xl sm:rounded-2xl border border-stone-300 shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm md:text-base"
              >
                <span>Browse Aisles</span>
                <ChevronRight className="w-4 h-4 text-emerald-800" />
              </button>
            </div>

            {/* Quick community features */}
            <div className="mt-8 pt-5 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-xs text-stone-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Authentic Brands</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Fair Pricing</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Local Khattak Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full">
            <img
              src={heroImg}
              alt="Sheeraz General Store storefront and interior with fresh goods in Khattak"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-white/60 shadow-lg text-xs text-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-800 shrink-0" />
                <span className="font-semibold text-stone-900">Sheeraz General Store</span>
                <span className="text-stone-700 hidden sm:inline">• Khattak</span>
              </div>
              <span className="text-emerald-800 font-bold">Open 7 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL FEATURE SPOTLIGHT: FAHAD ISLAM & STORE LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-emerald-700/30 p-6 sm:p-8 shadow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Fahad Islam Image */}
            <div className="md:col-span-4 flex flex-col items-center sm:items-start">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-md">
                  <img
                    src={fahadImg}
                    alt="Fahad Islam, Co-Owner & Store General Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-400 text-emerald-950 font-bold text-[11px] px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-950" />
                  <span>Lead Co-Owner</span>
                </div>
              </div>
              <div className="mt-3 text-center sm:text-left">
                <h3 className="font-bold font-serif text-lg text-stone-900">{storeConfig.owners.name1}</h3>
                <p className="text-xs text-emerald-800 font-semibold">Lead General Manager • Khattak</p>
              </div>
            </div>

            {/* Content & Highlighting */}
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                <span>Featured Store Management</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                Personalized Care by Fahad Islam & Sadam Hussain
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                At Sheeraz General Store, <strong>Fahad Islam</strong> personally verifies every spice batch, drink crate, and sack of aged basmati rice that enters the shop, while <strong>Sadam Hussain</strong> oversees prompt home deliveries across Khattak. Together, they guarantee genuine Pakistani brands and fair neighborhood pricing.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigateTo('about')}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Meet Fahad & Sadam (Full Story)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl border border-stone-300 transition cursor-pointer"
                >
                  <span>Direct Shop Contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section id="featured-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Explore The Aisle</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Featured Store Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-0.5">
              Select any aisle to browse groceries, pantry spices, cold treats, and home utilities.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition cursor-pointer self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Categories Grid (2 cols on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('category', cat.id as ProductCategory)}
              className="group bg-white rounded-xl sm:rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-600/40 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-amber-300 block">
                    {cat.itemCountNote}
                  </span>
                  <h3 className="font-bold text-xs sm:text-base leading-tight drop-shadow-xs font-serif">
                    {cat.name}
                  </h3>
                </div>
              </div>

              <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between bg-white">
                <p className="text-[11px] sm:text-xs text-stone-700 line-clamp-2 leading-relaxed">
                  {cat.shortDescription}
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs font-bold text-emerald-800 group-hover:text-emerald-950 transition">
                  <span>Browse aisle</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner Area (Editable notice, no fake discounts) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="max-w-2xl text-center md:text-left space-y-2">
              <span className="inline-block bg-amber-400 text-emerald-950 text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Store Notice & Special Orders
              </span>
              <h3 className="text-lg sm:text-3xl font-extrabold font-serif">
                Need Bulk Daal, Rice Sacks or Event Beverages in Khattak?
              </h3>
              <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                Sheeraz General Store accepts advance orders for wedding supplies, bulk grains, party cold drinks, and wholesale packs. Contact Fahad Islam or Sadam Hussain directly or place your order online.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer text-center"
              >
                Contact Store
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-950/60 hover:bg-emerald-950 text-white font-medium text-xs sm:text-sm rounded-xl border border-emerald-600 transition flex items-center justify-center gap-1.5 cursor-pointer"
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
              <Store className="w-4 h-4 text-amber-500" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Popular Everyday Essentials
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-0.5">
              Sample inventory items commonly requested by families across Khattak.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition cursor-pointer self-start sm:self-auto"
          >
            <span>View All Items</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Products Grid (2 cols on small mobile, 3 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Simple Contact / Location Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-stone-900 font-serif">Store Location</h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {storeConfig.addressPlaceholder}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-700 font-medium">
              Community: <strong className="text-emerald-900">Khattak, KP</strong>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-stone-900 font-serif">Opening Hours</h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {storeConfig.openingHoursPlaceholder}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-emerald-800 font-semibold">
              Open 7 days a week for daily groceries
            </div>
          </div>

          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-stone-900 font-serif">Call Or Message</h4>
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
