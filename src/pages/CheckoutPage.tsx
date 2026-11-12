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
  Copy,
  Check,
  Send,
  MessageCircle,
  Zap,
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
    showToast,
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nearbyLandmark, setNearbyLandmark] = useState('');
  const [cityArea, setCityArea] = useState('Khattak');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cash-on-delivery');
  const [trxId, setTrxId] = useState('');
  const [senderAccount, setSenderAccount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const deliveryFee = storeConfig.deliveryFeePlaceholder;
  const grandTotal = cartSubtotal + deliveryFee;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${key} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

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
      setFormError('Please provide a working mobile phone number for delivery contact.');
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
      transactionReferenceId: trxId.trim() || undefined,
      senderAccountDetails: senderAccount.trim() || undefined,
    };

    setTimeout(() => {
      submitOrder(customerDetails);
      setIsSubmitting(false);
    }, 400);
  };

  // WhatsApp 1-tap direct mobile checkout
  const handleWhatsAppOrder = () => {
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setFormError('Please fill in your name, phone, and delivery address before ordering via WhatsApp.');
      return;
    }

    const itemsSummary = cart
      .map((item) => `• ${item.product.name} (${item.product.unit}) x ${item.quantity} = Rs. ${item.product.price * item.quantity}`)
      .join('\n');

    const msg = `*New Order for Sheeraz General Store (Khattak)*\n\n` +
      `*Customer:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Address:* ${address}, ${cityArea} ${nearbyLandmark ? `(Near ${nearbyLandmark})` : ''}\n` +
      `*Payment Method:* ${paymentMethod.toUpperCase()}\n` +
      (trxId ? `*Transaction/TRX ID:* ${trxId}\n` : '') +
      (orderNotes ? `*Notes:* ${orderNotes}\n` : '') +
      `\n*Items:*\n${itemsSummary}\n\n` +
      `*Items Subtotal:* Rs. ${cartSubtotal}\n` +
      `*Estimated Delivery:* Rs. ${deliveryFee}\n` +
      `*Total Amount:* Rs. ${grandTotal}\n\n` +
      `Please confirm and dispatch our order. Thank you!`;

    const encoded = encodeURIComponent(msg);
    // WhatsApp URL
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
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
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
          Complete Your Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 mt-1">
          Provide your local delivery details in Khattak. Choose your preferred transfer or cash payment option.
        </p>
      </div>

      {formError && (
        <div className="p-4 bg-red-50 border border-red-300 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-red-800 font-medium">{formError}</div>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Customer and Delivery Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Contact & Delivery Info */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-xs space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-base sm:text-lg font-bold font-serif text-stone-900">
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
                  className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Phone Number (For Delivery Call) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden font-mono"
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
                  className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
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
                  className="w-full px-3.5 py-3 bg-stone-100 border border-stone-300 rounded-xl text-sm font-semibold text-stone-800 focus:outline-hidden"
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
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
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

          {/* Step 2: Payment Choices & Transfer Options */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base sm:text-lg font-bold font-serif text-stone-900">
                  Payment & Transfer Options
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="text-[11px] text-amber-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize Accounts</span>
              </button>
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
                      Most Popular
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1">
                    Pay in cash when our delivery rider brings your order to your home in Khattak, or pay at the shop counter upon pickup.
                  </p>
                </div>
              </label>

              {/* Option 2: Easypaisa Mobile Transfer */}
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
                      Direct wallet-to-wallet transfer via Easypaisa App or Telenor mobile code.
                    </p>
                  </div>
                </div>

                {paymentMethod === 'easypaisa' && (
                  <div className="ml-0 sm:ml-8 p-3.5 bg-white rounded-xl border border-emerald-300 text-xs space-y-3">
                    <div className="flex justify-between items-center text-stone-700">
                      <span className="font-semibold">Store Easypaisa Account:</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(storeConfig.easypaisaAccountPlaceholder, 'Easypaisa Account')}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'Easypaisa Account' ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'Easypaisa Account' ? 'Copied!' : 'Copy Number'}</span>
                      </button>
                    </div>

                    <div className="p-2.5 bg-stone-50 rounded-lg font-mono text-emerald-950 font-bold text-sm border border-stone-200">
                      {storeConfig.easypaisaAccountPlaceholder}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Your Easypaisa Transaction ID / Sender Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. TRX-938201 or Tariq Khan"
                        className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      />
                    </div>

                    <div className="text-[11px] text-stone-700 space-y-1">
                      <p><strong>Instructions:</strong> {storeConfig.easypaisaInstructions}</p>
                      <p className="text-amber-800 font-medium">
                        ⚠️ Payment will be verified by Fahad Islam or Sadam Hussain before order is dispatched.
                      </p>
                    </div>
                  </div>
                )}
              </label>

              {/* Option 3: JazzCash Mobile Transfer */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 cursor-pointer ${
                  paymentMethod === 'jazzcash'
                    ? 'border-emerald-700 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="jazzcash"
                    checked={paymentMethod === 'jazzcash'}
                    onChange={() => setPaymentMethod('jazzcash')}
                    className="mt-1 text-emerald-800 focus:ring-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-amber-700" />
                      <span className="font-bold text-stone-900 text-sm">
                        JazzCash Mobile Wallet
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 mt-1">
                      Send payment directly to our JazzCash account via app or *786# mobile code.
                    </p>
                  </div>
                </div>

                {paymentMethod === 'jazzcash' && (
                  <div className="ml-0 sm:ml-8 p-3.5 bg-white rounded-xl border border-amber-300 text-xs space-y-3">
                    <div className="flex justify-between items-center text-stone-700">
                      <span className="font-semibold">Store JazzCash Account:</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(storeConfig.jazzcashAccountPlaceholder, 'JazzCash Account')}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-950 text-[11px] font-bold rounded-lg border border-amber-200 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'JazzCash Account' ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'JazzCash Account' ? 'Copied!' : 'Copy Number'}</span>
                      </button>
                    </div>

                    <div className="p-2.5 bg-stone-50 rounded-lg font-mono text-stone-900 font-bold text-sm border border-stone-200">
                      {storeConfig.jazzcashAccountPlaceholder}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Your JazzCash Transaction ID (TID) (Optional)
                      </label>
                      <input
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. TID-10928374 or Sender Number"
                        className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      />
                    </div>

                    <div className="text-[11px] text-stone-700 space-y-1">
                      <p><strong>Instructions:</strong> {storeConfig.jazzcashInstructions}</p>
                    </div>
                  </div>
                )}
              </label>

              {/* Option 4: Raast SBP Instant Transfer */}
              <label
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 cursor-pointer ${
                  paymentMethod === 'raast'
                    ? 'border-emerald-700 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="raast"
                    checked={paymentMethod === 'raast'}
                    onChange={() => setPaymentMethod('raast')}
                    className="mt-1 text-emerald-800 focus:ring-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-700" />
                      <span className="font-bold text-stone-900 text-sm">
                        Raast Instant P2P Payment (State Bank of Pakistan)
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                        0% Fee
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 mt-1">
                      Zero-fee instant transfer from any Pakistani bank app using our registered Raast ID.
                    </p>
                  </div>
                </div>

                {paymentMethod === 'raast' && (
                  <div className="ml-0 sm:ml-8 p-3.5 bg-white rounded-xl border border-emerald-300 text-xs space-y-3">
                    <div className="flex justify-between items-center text-stone-700">
                      <span className="font-semibold">Registered Raast ID:</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(storeConfig.raastIdPlaceholder, 'Raast ID')}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'Raast ID' ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'Raast ID' ? 'Copied!' : 'Copy Raast ID'}</span>
                      </button>
                    </div>

                    <div className="p-2.5 bg-stone-50 rounded-lg font-mono text-emerald-950 font-bold text-sm border border-stone-200">
                      {storeConfig.raastIdPlaceholder}
                    </div>

                    <div className="text-[11px] text-stone-700 space-y-1">
                      <p><strong>Instructions:</strong> {storeConfig.raastInstructions}</p>
                    </div>
                  </div>
                )}
              </label>

              {/* Option 5: Direct Bank Transfer (IBFT) */}
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
                        Direct Bank Transfer (HBL / Meezan / IBFT)
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 mt-1">
                      Transfer from any Pakistani bank account via 24-digit IBAN.
                    </p>
                  </div>
                </div>

                {paymentMethod === 'bank-transfer' && (
                  <div className="ml-0 sm:ml-8 p-3.5 bg-white rounded-xl border border-emerald-300 text-xs space-y-3">
                    <div className="flex justify-between items-center text-stone-700">
                      <span className="font-semibold">Store Bank Account Details:</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(storeConfig.bankIbanPlaceholder, 'IBAN')}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'IBAN' ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'IBAN' ? 'Copied!' : 'Copy IBAN'}</span>
                      </button>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-lg space-y-1 text-stone-900 border border-stone-200">
                      <div><strong>Bank:</strong> {storeConfig.bankNamePlaceholder}</div>
                      <div><strong>Account Title:</strong> {storeConfig.bankAccountTitlePlaceholder}</div>
                      <div className="font-mono text-xs"><strong>IBAN:</strong> {storeConfig.bankIbanPlaceholder}</div>
                    </div>

                    <div className="text-[11px] text-stone-700 space-y-1">
                      <p><strong>Instructions:</strong> {storeConfig.bankInstructions}</p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-xs space-y-5 sticky top-28">
            <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 border-b border-stone-100 pb-3">
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

            {/* Trust notice */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
              <div className="flex items-center gap-1 font-semibold text-stone-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verification & Fulfillment Notice</span>
              </div>
              <p>
                All orders are personally inspected and packed by Fahad Islam and Sadam Hussain.
              </p>
            </div>

            {/* Order Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Recording Order...</span>
                ) : (
                  <>
                    <span>Place Store Order (Rs. {grandTotal})</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>1-Tap Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
