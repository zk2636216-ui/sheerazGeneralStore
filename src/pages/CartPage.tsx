import React from 'react';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Store,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    storeConfig,
    navigateTo,
  } = useStore();

  const total = cartSubtotal + storeConfig.deliveryFeePlaceholder;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-6 border border-emerald-200">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold font-serif text-stone-900">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-stone-700 mt-2 max-w-md mx-auto text-sm sm:text-base">
          Browse through Sheeraz General Store’s aisles to add soft drinks, spices, snacks, rice, electrical parts, or mobile top-ups.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
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
          Shop
        </button>
        <span>/</span>
        <span className="text-emerald-900 font-bold">Shopping Cart</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-serif text-stone-900">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 mt-0.5">
            Review your grocery items before proceeding to Khattak checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-semibold self-start sm:self-auto flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Items</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items Table / List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs divide-y divide-stone-100">
          <div className="p-4 bg-stone-50 font-bold text-xs text-stone-700 uppercase tracking-wider hidden sm:grid grid-cols-12 gap-4">
            <div className="col-span-6">Product Details</div>
            <div className="col-span-2 text-center">Unit Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {cart.map((item) => (
            <div
              key={item.product.id}
              className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
            >
              <div className="col-span-6 flex items-center gap-4 w-full">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block">
                    {item.product.category.replace('-', ' & ')}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">{item.product.unit}</p>
                </div>
              </div>

              <div className="col-span-2 text-center text-sm font-semibold text-stone-700">
                Rs. {item.product.price}
              </div>

              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-l-xl transition"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-stone-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-r-xl transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <span className="sm:hidden text-xs text-stone-700">Item Total:</span>
                <span className="font-extrabold text-emerald-900 text-sm sm:text-base font-serif">
                  Rs. {item.product.price * item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-stone-400 hover:text-red-600 transition p-1"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 bg-stone-50 flex items-center justify-between">
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
            <span className="text-xs text-stone-700">
              {cart.reduce((s, i) => s + i.quantity, 0)} total units
            </span>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
            <h2 className="text-lg font-bold font-serif text-stone-900 border-b border-stone-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-bold text-stone-900">Rs. {cartSubtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Delivery (Khattak)</span>
                <span className="font-bold text-emerald-800">
                  Rs. {storeConfig.deliveryFeePlaceholder}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-base text-stone-900 font-serif">Estimated Total</span>
                <span className="font-extrabold text-2xl text-emerald-900 font-serif">
                  Rs. {total}
                </span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Khattak Delivery Info</span>
              </div>
              <p className="text-[11px] text-stone-600">
                {storeConfig.deliveryNoticePlaceholder}
              </p>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
