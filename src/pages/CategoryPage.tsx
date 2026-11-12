import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpDown,
  Smartphone,
  Send,
  CheckCircle2,
  Sparkles,
  Info,
  Zap,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

interface CategoryPageProps {
  categoryId?: ProductCategory;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId }) => {
  const {
    selectedCategory,
    categories,
    products,
    navigateTo,
    addToCart,
    showToast,
  } = useStore();

  const currentCatId = categoryId || selectedCategory || 'pepsi-drinks';
  const categoryInfo = categories.find((c) => c.id === currentCatId) || categories[0];

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Mobile Top-Up Quick Form State (for mobile-topups-easypaisa aisle)
  const [network, setNetwork] = useState('Jazz');
  const [mobileNumber, setMobileNumber] = useState('');
  const [customAmount, setCustomAmount] = useState('200');
  const [topUpType, setTopUpType] = useState<'Prepaid Balance' | 'Easypaisa Deposit' | 'Card Pin'>('Prepaid Balance');

  const categoryProducts = products
    .filter((p) => p.category === categoryInfo.id)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const handleCustomTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim()) {
      showToast('Please enter your mobile phone number');
      return;
    }
    const amountVal = Number(customAmount);
    if (!amountVal || amountVal <= 0) {
      showToast('Please enter a valid amount');
      return;
    }

    // Create a special custom service item and add to cart
    const customServiceItem = {
      id: `topup-${Date.now()}`,
      name: `${network} ${topUpType} (Rs. ${amountVal}) - For ${mobileNumber}`,
      category: 'mobile-topups-easypaisa' as ProductCategory,
      price: amountVal,
      unit: `Recharge for ${mobileNumber}`,
      image: categoryInfo.image,
      imagePromptDescription: 'Mobile digital recharge transaction service receipt',
      description: `Service request for ${topUpType} of Rs. ${amountVal} to phone number: ${mobileNumber}. Handled directly at Sheeraz General Store counter.`,
      inStock: true,
      brand: network,
    };

    addToCart(customServiceItem, 1);
    showToast(`Added Rs. ${amountVal} ${network} request to cart!`);
    setMobileNumber('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-emerald-800 transition cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop')}
          className="hover:text-emerald-800 transition cursor-pointer"
        >
          Shop All
        </button>
        <span>/</span>
        <span className="text-emerald-900 font-bold">{categoryInfo.name}</span>
      </div>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-emerald-950 text-white min-h-[220px] sm:min-h-[260px] flex items-center shadow-lg">
        <img
          src={categoryInfo.image}
          alt={categoryInfo.name}
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-linear-to-r from-emerald-950 via-emerald-950/85 to-transparent" />

        <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-emerald-900/80 px-2.5 py-1 rounded-full border border-emerald-700/60">
            <span>Store Aisle</span>
            <span>•</span>
            <span>{categoryInfo.itemCountNote}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight">
            {categoryInfo.name}
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans">
            {categoryInfo.shortDescription}
          </p>
        </div>
      </div>

      {/* Special Feature: Mobile Top-Up & Easypaisa Interactive Order Desk */}
      {categoryInfo.id === 'mobile-topups-easypaisa' && (
        <div className="bg-linear-to-br from-amber-50 to-emerald-50 rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Instant Counter Service in Khattak</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
              Direct Mobile Load & Easypaisa Transfer Request
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              Need balance on your phone right away? Submit your network and number below to add an instant recharge request to your cart. Fahad Islam and Sadam Hussain process local load quickly upon order confirmation.
            </p>

            <form onSubmit={handleCustomTopUpSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Network / Service
                </label>
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 font-semibold focus:outline-hidden focus:border-emerald-600"
                >
                  <option value="Jazz">Jazz / Mobilink</option>
                  <option value="Telenor">Telenor</option>
                  <option value="Zong">Zong 4G</option>
                  <option value="Ufone">Ufone</option>
                  <option value="Easypaisa">Easypaisa Account Deposit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Service Type
                </label>
                <select
                  value={topUpType}
                  onChange={(e) => setTopUpType(e.target.value as any)}
                  className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 font-semibold focus:outline-hidden focus:border-emerald-600"
                >
                  <option value="Prepaid Balance">Direct Balance Load</option>
                  <option value="Easypaisa Deposit">Cash-In Deposit</option>
                  <option value="Card Pin">Scratch Card Pin via SMS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Recipient Phone Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="03XX-XXXXXXX"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Amount (PKR)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="50"
                    step="10"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 font-bold focus:outline-hidden focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sorting bar & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="text-xs text-stone-700">
          Showing <strong className="text-stone-900 font-bold">{categoryProducts.length}</strong> items in{' '}
          <span className="text-emerald-900 font-semibold">{categoryInfo.name}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-700">
          <ArrowUpDown className="w-3.5 h-3.5 text-stone-700" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-hidden focus:border-emerald-600"
          >
            <option value="featured">Featured Picks</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Switch to Other Categories strip */}
      <div className="mt-16 pt-8 border-t border-stone-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600 mb-4">
          Explore Other Aisles
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.id !== categoryInfo.id)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => navigateTo('category', c.id)}
                className="px-4 py-2 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 text-xs font-semibold rounded-xl border border-stone-200 transition cursor-pointer"
              >
                {c.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
