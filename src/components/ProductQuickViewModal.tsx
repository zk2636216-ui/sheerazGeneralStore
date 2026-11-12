import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Tag, Info, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductQuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsCartDrawerOpen } = useStore();
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, qty);
    setQuickViewProduct(null);
  };

  const handleAddAndCheckout = () => {
    addToCart(quickViewProduct, qty);
    setQuickViewProduct(null);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-8">
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-stone-100 backdrop-blur-md text-stone-700 hover:text-stone-900 flex items-center justify-center transition cursor-pointer shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-stone-100 aspect-square md:aspect-auto">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.isPopular && (
              <span className="absolute top-4 left-4 bg-amber-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Popular Pick
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700 mb-2">
                <span className="capitalize bg-stone-100 px-2.5 py-1 rounded-md text-stone-700">
                  {quickViewProduct.category.replace('-', ' & ')}
                </span>
                {quickViewProduct.brand && (
                  <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md font-semibold">
                    {quickViewProduct.brand}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 leading-snug">
                {quickViewProduct.name}
              </h2>

              <div className="mt-2 text-sm text-stone-700 font-medium">
                Unit / Size: <span className="text-stone-800 font-semibold">{quickViewProduct.unit}</span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-800 font-serif">
                  Rs. {quickViewProduct.price}
                </span>
                <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  In Stock in Khattak
                </span>
              </div>

              <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Image generation metadata note */}
              <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-700 space-y-1">
                <div className="font-semibold text-stone-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Visual Reference & Prompt Description:</span>
                </div>
                <p className="italic text-stone-600">
                  "{quickViewProduct.imagePromptDescription}"
                </p>
              </div>
            </div>

            {/* Quantity Selector and Action buttons */}
            <div className="mt-6 pt-6 border-t border-stone-100 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-xs">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 text-stone-600 hover:text-stone-900 font-bold flex items-center justify-center hover:bg-stone-50 transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-stone-800">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 text-stone-600 hover:text-stone-900 font-bold flex items-center justify-center hover:bg-stone-50 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-700">
                  Total: <strong className="text-emerald-900">Rs. {quickViewProduct.price * qty}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className="py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleAddAndCheckout}
                  className="py-3 px-4 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-md"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
