import React from 'react';
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CreditCard,
  Truck,
  Heart,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { storeConfig, navigateTo, categories, setIsSettingsOpen } = useStore();

  return (
    <footer className="bg-emerald-950 text-stone-200 mt-20 border-t border-emerald-900/60">
      {/* Trust badges strip */}
      <div className="border-b border-emerald-900/60 bg-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center shrink-0 text-amber-300">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">Community Store</h4>
                <p className="text-xs text-stone-300 mt-1">
                  Proudly serving Khattak with fresh daily groceries and kitchen staples.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center shrink-0 text-amber-300">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">Local Khattak Delivery</h4>
                <p className="text-xs text-stone-300 mt-1">
                  Reliable doorstep delivery or quick in-store counter pickup.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center shrink-0 text-amber-300">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">Flexible Payments</h4>
                <p className="text-xs text-stone-300 mt-1">
                  Cash on Delivery, Easypaisa, or direct bank transfer options.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center shrink-0 text-amber-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">Fresh & Genuine</h4>
                <p className="text-xs text-stone-300 mt-1">
                  Quality products inspected personally by Fahad Islam & Sadam Hussain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Owners column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-white block">
                  Sheeraz <span className="text-amber-400">General Store</span>
                </span>
                <span className="text-xs text-emerald-300">Khattak, Khyber Pakhtunkhwa</span>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed max-w-sm">
              Your trusted neighborhood general store providing quality cooking spices, cold drinks, dairy, snacks, grain sacks, electrical supplies, and mobile recharge services.
            </p>

            <div className="bg-emerald-900/50 rounded-2xl p-4 border border-emerald-800/60 max-w-sm">
              <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                Store Ownership
              </div>
              <p className="text-sm text-white font-medium">
                Owned and operated by <span className="font-semibold text-emerald-300">{storeConfig.owners.name1}</span> and <span className="font-semibold text-emerald-300">{storeConfig.owners.name2}</span>.
              </p>
              <p className="text-xs text-stone-300 mt-1">
                Rooted in Khattak, dedicated to honest weights, fair prices, and warm community hospitality.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Explore Store
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  About Us & Owners
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Contact & Store Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('cart')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Shopping Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('category', cat.id as ProductCategory)}
                    className="hover:text-amber-300 transition cursor-pointer truncate max-w-full text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Placeholders */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Store Info (Khattak)
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{storeConfig.addressPlaceholder}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{storeConfig.phonePlaceholder}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="truncate">{storeConfig.emailPlaceholder}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{storeConfig.openingHoursPlaceholder}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-full py-2 px-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-semibold rounded-xl border border-emerald-700/60 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize Store Placeholders</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods and Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-medium text-stone-300">Accepted Payment Methods:</span>
            <span className="bg-emerald-900 px-2.5 py-1 rounded-md text-emerald-200 border border-emerald-800">
              Cash on Delivery (COD)
            </span>
            <span className="bg-emerald-900 px-2.5 py-1 rounded-md text-emerald-200 border border-emerald-800">
              Easypaisa Mobile Wallet
            </span>
            <span className="bg-emerald-900 px-2.5 py-1 rounded-md text-emerald-200 border border-emerald-800">
              Direct Bank Transfer
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => navigateTo('privacy')}
              className="hover:text-amber-300 transition cursor-pointer underline underline-offset-4"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('terms')}
              className="hover:text-amber-300 transition cursor-pointer underline underline-offset-4"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-stone-300">
          <p>
            © {new Date().getFullYear()} Sheeraz General Store. All rights reserved. Located in Khattak.
            Sample products and prices are provided for preview and may be customized by store management.
          </p>
        </div>
      </div>
    </footer>
  );
};
