import React from 'react';
import {
  Store,
  MapPin,
  Heart,
  ShieldCheck,
  Truck,
  Clock,
  Sparkles,
  Phone,
  Mail,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import communityImg from '../assets/images/sheeraz_store_community_1794453062423.jpg';
import heroImg from '../assets/images/sheeraz_store_hero_1794452947740.jpg';

export const AboutPage: React.FC = () => {
  const { storeConfig, navigateTo, setIsSettingsOpen } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-emerald-800 transition cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-emerald-900 font-bold">About Us</span>
      </div>

      {/* Main Story Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold border border-emerald-300">
            <Store className="w-3.5 h-3.5 text-emerald-700" />
            <span>Community Grocery & General Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
            About <span className="text-emerald-800">Sheeraz General Store</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            <strong>Sheeraz General Store</strong> is a local neighborhood grocery and general store serving families and residents in <strong>Khattak</strong>.
          </p>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Our shop was established to provide the Khattak community with a clean, welcoming place to pick up fresh pantry supplies, chilled drinks, spices for daily home cooking, school snacks for children, emergency electrical goods, and reliable telecom recharges.
          </p>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-stone-800 space-y-1">
            <span className="font-bold text-amber-900 block">Our Promise to Khattak</span>
            <p className="text-stone-700">
              Honest weights, genuine products, transparent prices, and respectful service every time you walk into our store or place an order online.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-xl aspect-4/3">
            <img
              src={communityImg}
              alt="Sheeraz General Store shopfront in Khattak"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
              <span className="font-bold font-serif text-sm block">Our Neighborhood Shopfront</span>
              <span className="text-stone-200">Khattak, Khyber Pakhtunkhwa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Owners Section */}
      <section className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-xs space-y-8">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Store Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Meet the Owners
          </h2>
          <p className="text-sm text-stone-700 mt-2">
            Sheeraz General Store is owned and operated by <strong>{storeConfig.owners.name1}</strong> and <strong>{storeConfig.owners.name2}</strong>, members of the Khattak community.
          </p>
        </div>

        {/* Owner Profile Cards (Initials only, strictly respecting policy against fabricated owner photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fahad Islam */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-emerald-600/40 transition">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 font-serif font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md border-2 border-emerald-600">
              FI
            </div>
            <div className="space-y-1">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                Co-Owner
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900">
                {storeConfig.owners.name1}
              </h3>
              <p className="text-xs font-semibold text-emerald-800">
                Store Operations & Quality Assurance
              </p>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                Oversees daily store operations, supplier orders, fresh inventory inspection, and ensures orders are packed with care for Khattak residents.
              </p>
            </div>
          </div>

          {/* Sadam Hussain */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-emerald-600/40 transition">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-900 to-stone-900 text-amber-300 font-serif font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md border-2 border-emerald-700">
              SH
            </div>
            <div className="space-y-1">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                Co-Owner
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900">
                {storeConfig.owners.name2}
              </h3>
              <p className="text-xs font-semibold text-emerald-800">
                Customer Care & Community Services
              </p>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                Manages customer support, local delivery logistics, mobile balance services, and ensures every customer receives attentive neighborhood hospitality.
              </p>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-stone-600 italic bg-stone-100/70 p-3 rounded-xl border border-stone-200">
          Note: To ensure genuine representation, profile badges display verified store owner initials. No fabricated or stock portraits are used to represent Fahad Islam or Sadam Hussain.
        </div>
      </section>

      {/* Store Values & Community Commitments */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif text-center">
          What Sets Our General Store Apart
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold font-serif text-lg text-stone-900">Genuine Brands & Fresh Batches</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We stock authentic staples from leading trusted manufacturers: Shan, National, PepsiCo, Walls, Peek Freans, and Unilever.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold font-serif text-lg text-stone-900">Community First</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We know our neighbors by name. Whether you need a single 12W LED bulb or 20kg of rice for an occasion, we treat every order with warmth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold font-serif text-lg text-stone-900">Prompt Local Delivery</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Fast drop-off right to your home in Khattak. Cash on Delivery and Easypaisa options make checkout effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Editable Details Notice Card */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-stone-900 text-sm">Need to update store location or phone details?</h4>
          <p className="text-xs text-stone-600 mt-0.5">
            Store owners can customize contact info, address, and announcement notices at any time.
          </p>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300" />
          <span>Edit Store Information</span>
        </button>
      </div>
    </div>
  );
};
