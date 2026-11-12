import React from 'react';
import {
  CheckCircle2,
  Clock,
  Printer,
  ShoppingBag,
  ArrowRight,
  Phone,
  MapPin,
  AlertTriangle,
  Store,
  CreditCard,
  Banknote,
  Smartphone,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, storeConfig, navigateTo } = useStore();

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold font-serif text-stone-900">
          No Recent Order Found
        </h1>
        <p className="text-stone-700 text-sm mt-2">
          It looks like you haven't placed an order during this session yet.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-6 px-6 py-2.5 bg-emerald-800 text-white font-semibold text-sm rounded-xl cursor-pointer"
        >
          Return to Store Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Success Badge Banner */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-800 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 text-amber-300" />
        </div>
        <div className="inline-block px-3 py-1 bg-emerald-200 text-emerald-950 rounded-full text-xs font-bold uppercase tracking-wider">
          Order Recorded Successfully
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
          Thank You, {currentOrder.customer.fullName}!
        </h1>
        <p className="text-stone-700 text-sm max-w-lg mx-auto">
          Your order has been recorded at <strong>{storeConfig.storeName}</strong> in Khattak.
          Our team is reviewing your order details.
        </p>
      </div>

      {/* Payment Verification Notice */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs sm:text-sm text-stone-800 flex items-start gap-3">
        <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-950 block font-bold">
            Payment & Verification Status: {currentOrder.status}
          </strong>
          <p className="text-stone-700">
            {currentOrder.paymentMethod === 'cash-on-delivery' &&
              'Please have exact cash ready (Rs. ' +
                currentOrder.total +
                ') when our delivery rider arrives or when you collect your parcel from the store.'}
            {currentOrder.paymentMethod === 'easypaisa' &&
              `Please send Rs. ${currentOrder.total} to our Easypaisa account: ${storeConfig.easypaisaAccountPlaceholder}. An order is confirmed as paid once verified by Fahad Islam or Sadam Hussain.`}
            {currentOrder.paymentMethod === 'jazzcash' &&
              `Please send Rs. ${currentOrder.total} to our JazzCash account: ${storeConfig.jazzcashAccountPlaceholder}. Store staff will verify and dispatch.`}
            {currentOrder.paymentMethod === 'raast' &&
              `Please send Rs. ${currentOrder.total} via Raast (0% fee) to registered Raast ID: ${storeConfig.raastIdPlaceholder}.`}
            {currentOrder.paymentMethod === 'bank-transfer' &&
              `Please transfer Rs. ${currentOrder.total} to ${storeConfig.bankNamePlaceholder} (IBAN: ${storeConfig.bankIbanPlaceholder}). Kindly share the transaction reference with the store.`}
          </p>
        </div>
      </div>

      {/* Order Invoice / Receipt Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
        {/* Receipt Header */}
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-800" />
              <span className="font-bold font-serif text-stone-900 text-lg">
                Sheeraz General Store
              </span>
            </div>
            <p className="text-xs text-stone-700 mt-0.5">
              Khattak Community Shop • Owners: {storeConfig.owners.name1} & {storeConfig.owners.name2}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-stone-700">Order Reference:</div>
            <div className="text-base font-extrabold text-emerald-900 font-mono">
              #{currentOrder.orderId}
            </div>
            <div className="text-[11px] text-stone-700">{currentOrder.date}</div>
          </div>
        </div>

        {/* Customer & Delivery Summary */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-stone-100 text-xs text-stone-700">
          <div className="space-y-1.5">
            <span className="font-bold uppercase text-stone-700 block">
              Deliver To:
            </span>
            <div className="font-bold text-sm text-stone-900">
              {currentOrder.customer.fullName}
            </div>
            <div className="flex items-center gap-1.5 text-stone-700">
              <Phone className="w-3.5 h-3.5 text-emerald-800" />
              <span className="font-mono">{currentOrder.customer.phone}</span>
            </div>
            <div className="flex items-start gap-1.5 text-stone-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
              <span>
                {currentOrder.customer.address}, {currentOrder.customer.cityArea}
                {currentOrder.customer.nearbyLandmark && (
                  <span className="block text-stone-600">
                    Landmark: {currentOrder.customer.nearbyLandmark}
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold uppercase text-stone-700 block">
              Payment Selection:
            </span>
            <div className="font-bold text-sm text-stone-900 capitalize">
              {currentOrder.paymentMethod.replace(/-/g, ' ')}
            </div>
            <div className="text-stone-700">
              Status: <span className="font-semibold text-amber-800">{currentOrder.status}</span>
            </div>
            {currentOrder.customer.orderNotes && (
              <div className="pt-1 text-stone-700 bg-stone-50 p-2 rounded-lg">
                <strong>Notes:</strong> {currentOrder.customer.orderNotes}
              </div>
            )}
          </div>
        </div>

        {/* Items List */}
        <div className="p-6">
          <h3 className="font-bold text-xs uppercase text-stone-700 mb-3 tracking-wider">
            Purchased Items
          </h3>
          <div className="divide-y divide-stone-100 text-xs">
            {currentOrder.items.map((item) => (
              <div key={item.product.id} className="py-2.5 flex justify-between items-center">
                <div className="min-w-0 flex-1 pr-3">
                  <div className="font-semibold text-stone-900">{item.product.name}</div>
                  <div className="text-stone-700">
                    {item.quantity} × Rs. {item.product.price} ({item.product.unit})
                  </div>
                </div>
                <div className="font-bold text-stone-900 font-serif">
                  Rs. {item.product.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-700">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900">Rs. {currentOrder.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery (Khattak)</span>
              <span className="font-semibold text-emerald-800">Rs. {currentOrder.deliveryFee}</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-extrabold text-stone-900 font-serif">
              <span>Total Payable</span>
              <span className="text-emerald-900">Rs. {currentOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Actions & Print */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl border border-stone-300 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              <span>Shop More Groceries</span>
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl border border-stone-300 transition cursor-pointer"
            >
              Contact Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
