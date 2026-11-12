import React from 'react';
import { ShoppingBag, Eye, Plus, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart, updateQuantity, setQuickViewProduct } = useStore();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={`${product.name} available at Sheeraz General Store`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Popular / Category badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isPopular && (
            <span className="bg-amber-400 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              Popular Pick
            </span>
          )}
          {product.brand && (
            <span className="bg-white/90 backdrop-blur-xs text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              {product.brand}
            </span>
          )}
        </div>

        {/* Quick View Button overlay for desktop, and persistent mobile tap trigger */}
        <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="px-3.5 py-2 bg-white text-emerald-950 text-xs font-semibold rounded-xl shadow-lg hover:bg-emerald-50 transition transform translate-y-2 group-hover:translate-y-0 duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-700" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Mobile Quick View Floating Trigger */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="md:hidden absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md text-stone-700 flex items-center justify-center cursor-pointer active:scale-95 transition"
          aria-label="Quick view product details"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-800" />
        </button>

        {/* Stock tag */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <span className="bg-emerald-900/85 backdrop-blur-xs text-emerald-100 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            In Stock
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-stone-600 font-medium mb-1">
            {product.unit}
          </div>
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-stone-900 font-bold text-sm sm:text-base leading-snug line-clamp-2 hover:text-emerald-800 transition cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Cart Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-stone-600 block">Price</span>
            <div className="text-lg font-extrabold text-emerald-800 font-serif">
              Rs. {product.price}
            </div>
          </div>

          {inCartQty > 0 ? (
            <div className="flex items-center bg-emerald-50 border border-emerald-300 rounded-xl p-1 shadow-xs">
              <button
                onClick={() => updateQuantity(product.id, inCartQty - 1)}
                className="w-7 h-7 rounded-lg bg-white text-emerald-900 font-bold text-sm flex items-center justify-center hover:bg-emerald-100 transition cursor-pointer shadow-xs"
                title="Decrease quantity"
              >
                -
              </button>
              <span className="w-7 text-center font-bold text-xs text-emerald-950">
                {inCartQty}
              </span>
              <button
                onClick={() => updateQuantity(product.id, inCartQty + 1)}
                className="w-7 h-7 rounded-lg bg-emerald-800 text-white font-bold text-sm flex items-center justify-center hover:bg-emerald-900 transition cursor-pointer shadow-xs"
                title="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
