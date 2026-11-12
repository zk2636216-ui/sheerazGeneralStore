import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Truck,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerOrderDetails, PaymentMethodType } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    storeConfig,
    submitOrder,
    navigateTo,
    setIsSettingsOpen,
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nearbyLandmark, setNearbyLandmark] = useState('');
  const [cityArea, setCityArea] = useState('Khattak');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cash-on-delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const deliveryFee = storeConfig.deliveryFeePlaceholder;
  const grandTotal = cartSubtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold font-serif text-stone-900">
          Your cart is empty
        </h1>
        <p className="text-stone-700 text-sm mt-2">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 px-6 py-2.5 bg-emerald-800 text-white font-semibold text-sm rounded-xl cursor-pointer"
        >
          Browse Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please provide a working phone number for delivery contact.');
      return;
    }
    if (!address.trim()) {
      setFormError('Please provide your complete delivery address in Khattak.');
      return;
    }

    setIsSubmitting(true);

    const customerDetails: CustomerOrderDetails = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      nearbyLandmark: nearbyLandmark.trim(),
      cityArea: cityArea.trim(),
      orderNotes: orderNotes.trim(),
      paymentMethod,
    };

    setTimeout(() => {
      submitOrder(customerDetails);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
        <button
          onClick={() => navigateTo('cart')}
          className="hover:text-emerald-800 transition cursor-pointer flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>
        <span>/</span>
        <span className="text-emerald-900 font-bold">Checkout</span>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold font-serif text-stone-900">
          Complete Your Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 mt-1">
          Provide your local delivery details in Khattak. No online credit card charge required.
        </p>
      </div>

      {formError && (
        <div className="p-4 bg-red-50 border border-red-300 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-red-800 font-medium">{formError}</div>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customer and Delivery Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Contact & Delivery Info */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-lg font-bold font-serif text-stone-900">
                Customer & Delivery Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Asad Khattak"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Phone Number (For Delivery Call) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Street Address & House / Shop # <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, Street, Mohallah / Colony"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  City / Town
                </label>
                <input
                  type="text"
                  value={cityArea}
                  onChange={(e) => setCityArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-100 border border-stone-300 rounded-xl text-sm font-semibold text-stone-800 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Nearby Landmark (Optional)
              </label>
              <input
                type="text"
                value={nearbyLandmark}
                onChange={(e) => setNearbyLandmark(e.target.value)}
                placeholder="e.g. Near Jamia Masjid, Girls High School, or Main Chowk"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Order Notes / Special Delivery Instructions
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Any special packing instructions, preferred delivery time, or change needed for Rs. 5000 note..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Step 2: Payment Choices */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-lg font-bold font-serif text-stone-900">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {/* Option 1: Cash on Delivery */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-4 cursor-pointer ${
                  paymentMethod === 'cash-on-delivery'
                    ? 'border-emerald-700 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash-on-delivery"
                  checked={paymentMethod === 'cash-on-delivery'}
                  onChange={() => setPaymentMethod('cash-on-delivery')}
                  className="mt-1 text-emerald-800 focus:ring-emerald-600"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-emerald-800" />
                    <span className="font-bold text-stone-900 text-sm">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1">
                    Pay in cash when our delivery rider brings your order to your door in Khattak, or pay at the shop counter upon pickup.
                  </p>
                </div>
              </label>

              {/* Option 2: Easypaisa */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 cursor-pointer ${
                  paymentMethod === 'easypaisa'
                    ? 'border-emerald-700 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="easypaisa"
                    checked={paymentMethod === 'easypaisa'}
                    onChange={() => setPaymentMethod('easypaisa')}
                    className="mt-1 text-emerald-800 focus:ring-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-emerald-800" />
                      <span className="font-bold text-stone-900 text-sm">
                        Easypaisa Mobile Wallet
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 mt-1">
                      Direct wallet-to-wallet transfer via Easypaisa App or mobile USSD.
                    </p>
                  </div>
                </div>

                {/* Easypaisa details and instructions */}
                {paymentMethod === 'easypaisa' && (
                  <div className="ml-8 p-3.5 bg-white rounded-xl border border-emerald-300 text-xs space-y-2">
                    <div className="flex justify-between items-center text-stone-700">
                      <span className="font-semibold">Store Easypaisa Account:</span>
                      <button
                        type="button"
                        onClick={() => setIsSettingsOpen(true)}
                        className="text-[10px] text-amber-700 underline font-semibold cursor-pointer"
                      >
                        Edit in Settings
                      </button>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-lg font-mono text-emerald-950 font-bold text-sm border border-stone-200">
                      {storeConfig.easypaisaAccountPlaceholder}
                    </div>
                    <div className="text-[11px] text-stone-700 space-y-1">
                      <p><strong>Instructions:</strong> {storeConfig.easypaisaInstructions}</p>
                      <p className="text-amber-800 font-medium">
                        ⚠️ Important: Order is not confirmed as paid until store staff verifies payment receipt.
                      </p>
                    </div>
                  </div>
                )}
              </label>

              {/* Option 3: Bank Transfer */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 cursor-pointer ${
                  paymentMethod === 'bank-transfer'
                    ? 'border-emerald-700 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={paymentMethod === 'bank-transfer'}
                    onChange={() => setPaymentMethod('bank-transfer')}
                    className="mt-1 text-emerald-800 focus:ring-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-emerald-800" />
                      <span className="font-bold text-stone-900 text-sm">
                        Direct Bank Transfer (Online / IBFT)
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 mt-1">
                      Transfer from HBL, Meezan, UBL, or any Pakistani bank via IBFT.
                    </p>
                  </div>
                </div>

                {/* Bank details and instructions */}
                {paymentMethod === 'bank-transfer' && (
                  <div className="ml-8 p-3.5 bg-white rounded-xl border border-emerald-300 text-xs space-y-2">
                    <div className="flex justify-between items-center text-stone-700">
                      <span className="font-semibold">Store Bank Account Details:</span>
                      <button
                        type="button"
                        onClick={() => setIsSettingsOpen(true)}
                        className="text-[10px] text-amber-700 underline font-semibold cursor-pointer"
                      >
                        Edit in Settings
                      </button>
                    </div>
                    <div className="p-2.5 bg-stone-50 rounded-lg space-y-1 text-stone-900 border border-stone-200">
                      <div><strong>Bank:</strong> {storeConfig.bankNamePlaceholder}</div>
                      <div><strong>Title:</strong> {storeConfig.bankAccountTitlePlaceholder}</div>
                      <div className="font-mono text-xs"><strong>IBAN:</strong> {storeConfig.bankIbanPlaceholder}</div>
                    </div>
                    <div className="text-[11px] text-stone-700 space-y-1">
                      <p><strong>Instructions:</strong> {storeConfig.bankInstructions}</p>
                      <p className="text-amber-800 font-medium">
                        ⚠️ Note: Transfer verification will be performed by the store prior to dispatch.
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-5 sticky top-28">
            <h3 className="text-lg font-bold font-serif text-stone-900 border-b border-stone-100 pb-3">
              Order Items ({cart.length})
            </h3>

            {/* Compact item list */}
            <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="font-medium text-stone-900 truncate">
                      {item.product.name}
                    </div>
                    <div className="text-stone-700">
                      Qty: {item.quantity} × Rs. {item.product.price}
                    </div>
                  </div>
                  <div className="font-bold text-stone-900 shrink-0">
                    Rs. {item.product.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900">Rs. {cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery (Khattak)</span>
                <span className="font-semibold text-emerald-800">Rs. {deliveryFee}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-extrabold text-stone-900 font-serif">
                <span>Payable Amount</span>
                <span className="text-emerald-900">Rs. {grandTotal}</span>
              </div>
            </div>

            {/* Trust disclaimer */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
              <div className="flex items-center gap-1 font-semibold text-stone-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verification & Fulfillment Notice</span>
              </div>
              <p>
                By clicking "Place Order", your request will be recorded at Sheeraz General Store. We do not process automatic unverified payments.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Recording Order...</span>
              ) : (
                <>
                  <span>Place Order (Rs. {grandTotal})</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
