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
  Code2,
  Award,
  CheckCircle2,
  Users,
  Compass,
  Coffee,
  Sun,
  Star,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import communityImg from '../assets/images/sheeraz_store_community_1794453062423.jpg';
import heroImg from '../assets/images/sheeraz_store_hero_1794452947740.jpg';
import fahadImg from '../assets/images/fahad_islam_portrait_1794454111359.jpg';
import sadamImg from '../assets/images/sadam_hussain_portrait_1794454126081.jpg';

export const AboutPage: React.FC = () => {
  const { storeConfig, navigateTo, setIsSettingsOpen } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16 sm:space-y-24">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold border border-emerald-300">
            <Store className="w-3.5 h-3.5 text-emerald-700" />
            <span>Khattak Community Heritage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
            The Story Behind <br className="hidden sm:inline" />
            <span className="text-emerald-800">Sheeraz General Store</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            Rooted in the heart of <strong>Khattak</strong>, <strong>Sheeraz General Store</strong> is more than just a shop counter—it is a warm neighborhood anchor where friends meet, daily cooking essentials are hand-selected, and honest community trust is upheld every single morning.
          </p>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Founded and nurtured by <strong>Fahad Islam</strong> and <strong>Sadam Hussain</strong>, our general store has dedicated itself to serving local households with genuine brands, accurate weights, fair prices, and reliable home delivery. Whether it’s an urgent pack of spices for evening biryani, ice creams for excited kids after school, or emergency electrical replacements, Sheeraz General Store is always ready to serve.
          </p>

          <div className="p-4 sm:p-5 bg-linear-to-r from-amber-50 to-emerald-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-stone-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Our Unwavering Community Pledge</span>
            </div>
            <p className="text-stone-700 leading-relaxed">
              We never inflate prices, we test electrical fixtures before they leave our counter, and we personally check each grain sack and spice seal for freshness. That is the Sheeraz General Store difference.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-xl aspect-4/3 group">
            <img
              src={communityImg}
              alt="Sheeraz General Store neighborhood street in Khattak"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
              <span className="font-bold font-serif text-sm sm:text-base block">Our Khattak Streetfront</span>
              <span className="text-stone-200">Serving neighborhood families with dignity & care</span>
            </div>
          </div>
        </div>
      </div>

      {/* SPECIAL HIGHLIGHT SECTION: FAHAD ISLAM */}
      <section className="bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Portrait of Fahad Islam */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl relative">
                <img
                  src={fahadImg}
                  alt="Fahad Islam, Lead Co-Owner & Store General Manager of Sheeraz General Store"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-amber-400 text-emerald-950 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-950" />
                <span>Store Leader</span>
              </div>
            </div>

            <div className="mt-6 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                Fahad Islam
              </h3>
              <p className="text-amber-300 font-semibold text-sm">
                Co-Owner & Lead Store General Manager
              </p>
              <p className="text-xs text-stone-300 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Lifelong Resident of Khattak</span>
              </p>
            </div>
          </div>

          {/* Detailed Highlight text about Fahad Islam */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-700/80 text-amber-300 text-xs font-bold uppercase tracking-wider border border-emerald-600">
              Co-Owner Spotlight
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">
              Leading Sheeraz General Store with Integrity & Dedication
            </h2>

            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              As the lead manager and co-owner, <strong>Fahad Islam</strong> is the heart and driving engine of Sheeraz General Store in Khattak. From coordinating with premier suppliers across Khyber Pakhtunkhwa to ensuring that every rice sack is aged and aromatic, Fahad brings relentless passion to his neighborhood.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-700/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Strict Sourcing Standards</strong>
                  <span className="text-stone-300">Personally oversees the origin and authentic seals of Shan, PepsiCo, Walls, and Nestle products.</span>
                </div>
              </div>

              <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-700/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Neighbor First Attitude</strong>
                  <span className="text-stone-300">Known across Khattak for his friendly banter, generous hospitality, and fair pricing.</span>
                </div>
              </div>
            </div>

            <blockquote className="italic border-l-2 border-amber-400 pl-4 py-1 text-xs sm:text-sm text-stone-200">
              "A general store isn't just a business; it's a sacred trust. When a mother sends her child to buy milk or flour, she trusts that we will give him the freshest product at the exact right weight. That trust is what Sadam and I live for every single day."
              <span className="block not-italic font-bold text-amber-300 mt-1">— Fahad Islam</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CO-OWNER: SADAM HUSSAIN */}
      <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Portrait of Sadam Hussain */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start order-2 lg:order-1">
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-emerald-700 shadow-xl relative">
                <img
                  src={sadamImg}
                  alt="Sadam Hussain, Co-Owner & Head of Operations of Sheeraz General Store"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-300" />
                <span>Operations Lead</span>
              </div>
            </div>

            <div className="mt-6 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
                Sadam Hussain
              </h3>
              <p className="text-emerald-800 font-semibold text-sm">
                Co-Owner & Head of Customer Relations & Logistics
              </p>
              <p className="text-xs text-stone-600 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Khattak Community Representative</span>
              </p>
            </div>
          </div>

          {/* Details for Sadam Hussain */}
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              Co-Owner Profile
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
              The Pillar of Service & Community Logistics
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Working hand-in-hand with Fahad Islam, <strong>Sadam Hussain</strong> spearheads customer communication, dispatch logistics, and digital services such as Easypaisa cash-in and mobile top-ups. Sadam ensures that even if you can't leave your home, your groceries arrive promptly at your doorstep.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Swift Khattak Delivery</strong>
                  <span className="text-stone-600">Dispatches home delivery orders across Khattak with real-time phone updates.</span>
                </div>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Telecom & Mobile Hub</strong>
                  <span className="text-stone-600">Assists villagers and neighbors with balance recharge, bill pay, and Easypaisa transactions.</span>
                </div>
              </div>
            </div>

            <blockquote className="italic border-l-2 border-emerald-700 pl-4 py-1 text-xs sm:text-sm text-stone-700">
              "We consider our customers our extended family. Fahad and I are here from dawn till late evening to ensure nobody goes without daily essentials."
              <span className="block not-italic font-bold text-emerald-900 mt-1">— Sadam Hussain</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* A Day in the Life at Sheeraz General Store */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Behind the Scenes
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            A Day at Sheeraz General Store in Khattak
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            From the crack of dawn to the quiet night streets, here is how we serve our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
              <Sun className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-emerald-800">7:00 AM – 8:30 AM</span>
            <h4 className="font-bold text-stone-900 text-base">Fresh Arrival & Inspection</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Fahad Islam unlocks the store and inspects fresh dairy, cold drink replenishments, and new spice batches.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm">
              <Coffee className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="text-xs font-bold text-emerald-800">9:00 AM – 2:00 PM</span>
            <h4 className="font-bold text-stone-900 text-base">Morning Kitchen Rush</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Serving local residents with daal, aged basmati rice sacks, tea biscuits, and breakfast pantry goods.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
              <Truck className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-emerald-800">3:00 PM – 7:30 PM</span>
            <h4 className="font-bold text-stone-900 text-base">Deliveries & Top-Ups</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sadam Hussain coordinates home deliveries across Khattak while children stop by for afternoon ice creams and snacks.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm">
              <Clock className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="text-xs font-bold text-emerald-800">8:00 PM – 11:00 PM</span>
            <h4 className="font-bold text-stone-900 text-base">Evening Community Hub</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Late night emergency electrical parts, bulbs, mosquito coils, and packing next-day scheduled grocery orders.
            </p>
          </div>
        </div>
      </section>

      {/* PROMINENT DEVELOPER CREDIT SECTION: ZAKRIYA KHAN */}
      <section className="bg-linear-to-r from-stone-900 via-emerald-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/60">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-emerald-950 rounded-full text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Lead Digital Architect & Full Stack Engineer</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Website Engineered by <span className="text-amber-400">Zakriya Khan</span>
            </h3>

            <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">
              This modern, ultra-responsive digital store experience for <strong>Sheeraz General Store</strong> was designed and programmed from the ground up by <strong>Zakriya Khan — Full Stack Engineer</strong>.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <span className="bg-stone-800/80 px-2.5 py-1 rounded-md text-emerald-300 border border-stone-700">
                React 19 & TypeScript
              </span>
              <span className="bg-stone-800/80 px-2.5 py-1 rounded-md text-emerald-300 border border-stone-700">
                Tailwind CSS Responsive Design
              </span>
              <span className="bg-stone-800/80 px-2.5 py-1 rounded-md text-emerald-300 border border-stone-700">
                Mobile-First PWA Architecture
              </span>
              <span className="bg-stone-800/80 px-2.5 py-1 rounded-md text-emerald-300 border border-stone-700">
                GitHub Pages Static Optimization
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-emerald-950 font-extrabold text-2xl flex items-center justify-center shadow-lg font-serif">
              ZK
            </div>
            <div>
              <div className="font-bold text-white text-base">Zakriya Khan</div>
              <div className="text-xs text-amber-300 font-medium">Full Stack Software Engineer</div>
            </div>
            <div className="text-[11px] text-stone-400">
              Specialized in high-performance web applications, eCommerce systems, and modern UI engineering.
            </div>
          </div>
        </div>
      </section>

      {/* Editable Placeholders Notice */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-stone-900 text-sm">Need to update phone, address, or store hours?</h4>
          <p className="text-xs text-stone-600 mt-0.5">
            Store owners Fahad Islam and Sadam Hussain can adjust operational details at any time.
          </p>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300" />
          <span>Edit Store Information</span>
        </button>
      </div>
    </div>
  );
};
