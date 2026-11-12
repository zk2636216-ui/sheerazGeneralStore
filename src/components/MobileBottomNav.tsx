import React from 'react';
import { Home, ShoppingBag, Grid, Phone, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { currentRoute, navigateTo, cartTotalCount, setIsCartDrawerOpen } = useStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom">
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer ${
            currentRoute === 'home'
              ? 'text-emerald-800 font-bold'
              : 'text-stone-700 hover:text-emerald-800'
          }`}
        >
          <Home className={`w-5 h-5 ${currentRoute === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Shop All */}
        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer ${
            currentRoute === 'shop'
              ? 'text-emerald-800 font-bold'
              : 'text-stone-700 hover:text-emerald-800'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 ${currentRoute === 'shop' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Shop All</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => navigateTo('category')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer ${
            currentRoute === 'category'
              ? 'text-emerald-800 font-bold'
              : 'text-stone-700 hover:text-emerald-800'
          }`}
        >
          <Grid className={`w-5 h-5 ${currentRoute === 'category' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Aisles</span>
        </button>

        {/* Contact / Phone */}
        <button
          onClick={() => navigateTo('contact')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer ${
            currentRoute === 'contact'
              ? 'text-emerald-800 font-bold'
              : 'text-stone-700 hover:text-emerald-800'
          }`}
        >
          <Phone className={`w-5 h-5 ${currentRoute === 'contact' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Contact</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-emerald-900 hover:text-emerald-950 transition cursor-pointer"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <ShoppingCart className="w-4 h-4 text-amber-300" />
            </div>
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-emerald-900">Cart</span>
        </button>
      </div>
    </div>
  );
};
