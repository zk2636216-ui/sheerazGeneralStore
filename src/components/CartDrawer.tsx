import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    storeConfig,
    navigateTo,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewCartPage = () => {
    setIsCartDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-emerald-950/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-stone-900 font-serif">
                Your Shopping Cart
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-stone-900 text-lg font-serif">
                  Your cart is empty
                </h3>
                <p className="text-sm text-stone-700 mt-2 max-w-xs mx-auto">
                  Browse fresh drinks, spices, snacks, rice, and household essentials from Sheeraz General Store.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl shadow-md transition cursor-pointer"
                >
                  <span>Explore Shop</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-3.5 flex gap-3.5 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-stone-900 text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-stone-700">{item.product.unit}</p>
                      <div className="text-emerald-800 font-bold text-sm mt-0.5">
                        Rs. {item.product.price}
                      </div>

                      {/* Quantity row */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-stone-600 hover:text-stone-900 font-bold hover:bg-stone-200/60 rounded-l-lg transition"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-stone-600 hover:text-stone-900 font-bold hover:bg-stone-200/60 rounded-r-lg transition"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-600 p-1 transition cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">Rs. {cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Delivery (Khattak)</span>
                  <span className="font-medium text-emerald-800">
                    Rs. {storeConfig.deliveryFeePlaceholder}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900 font-serif">
                  <span>Total</span>
                  <span className="text-emerald-900">
                    Rs. {cartSubtotal + storeConfig.deliveryFeePlaceholder}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-stone-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                Note: Editable placeholder rates apply. Final order will be confirmed with customer prior to delivery.
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
                <button
                  onClick={handleViewCartPage}
                  className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs border border-stone-300 transition text-center cursor-pointer"
                >
                  View Full Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
