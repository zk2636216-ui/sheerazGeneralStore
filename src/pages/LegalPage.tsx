import React, { useState } from 'react';
import { Shield, FileText, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy' }) => {
  const { currentRoute, storeConfig, navigateTo, setIsSettingsOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(
    currentRoute === 'terms' ? 'terms' : initialTab
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-emerald-800 transition cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-emerald-900 font-bold">
          {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
        </span>
      </div>

      {/* Page Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold font-serif text-stone-900">
            Legal & Store Policies
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 mt-1">
            Standard customer policies for Sheeraz General Store, Khattak.
          </p>
        </div>

        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Terms & Conditions
          </button>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed space-y-6">
        {activeTab === 'privacy' ? (
          <>
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base not-prose mb-2">
              <Shield className="w-5 h-5 text-emerald-700" />
              <span>Sheeraz General Store – Privacy Policy (Editable Placeholder)</span>
            </div>

            <p>
              Last updated: <em>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</em>
            </p>

            <h3 className="text-base font-bold text-stone-900">1. Information We Collect</h3>
            <p>
              At <strong>Sheeraz General Store</strong> (owned and operated by Fahad Islam and Sadam Hussain in Khattak), we value the privacy of our neighborhood customers. When you place an online order or send an inquiry, we collect only the minimal details necessary to deliver your goods:
            </p>
            <ul>
              <li>Customer Full Name</li>
              <li>Delivery Phone Number</li>
              <li>Physical Delivery Address and landmarks within Khattak</li>
              <li>Order notes and preferences</li>
            </ul>

            <h3 className="text-base font-bold text-stone-900">2. How Your Information is Used</h3>
            <p>
              We do not sell, rent, or trade your personal information with any third-party marketing companies. Your contact number is used solely to coordinate delivery, confirm order availability, or respond to service requests.
            </p>

            <h3 className="text-base font-bold text-stone-900">3. Payment Security</h3>
            <p>
              We do not store credit card numbers or banking passwords on this website. All online transactions (via Easypaisa or direct Bank Transfer) occur directly within your own banking apps. Orders are verified by store staff prior to delivery.
            </p>

            <h3 className="text-base font-bold text-stone-900">4. Contact For Privacy Queries</h3>
            <p>
              If you have any questions regarding how your details are handled, please contact Sheeraz General Store at{' '}
              <span className="font-mono">{storeConfig.phonePlaceholder}</span> or email{' '}
              <span className="font-mono">{storeConfig.emailPlaceholder}</span>.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base not-prose mb-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <span>Sheeraz General Store – Terms & Conditions (Editable Placeholder)</span>
            </div>

            <p>
              Last updated: <em>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</em>
            </p>

            <h3 className="text-base font-bold text-stone-900">1. Store Scope & Service Area</h3>
            <p>
              These terms govern orders placed with <strong>Sheeraz General Store</strong>, located in Khattak, Khyber Pakhtunkhwa, managed by <strong>Fahad Islam</strong> and <strong>Sadam Hussain</strong>. Local delivery is provided within designated areas of Khattak.
            </p>

            <h3 className="text-base font-bold text-stone-900">2. Product Availability & Pricing</h3>
            <p>
              Product prices and weights are listed in Pakistani Rupees (PKR). While we strive for accuracy, inventory in our physical shop and supplier rates may fluctuate. If an item is momentarily out of stock, we will contact you to offer a suitable fresh replacement or adjust your order total.
            </p>

            <h3 className="text-base font-bold text-stone-900">3. Order Verification & Delivery</h3>
            <p>
              Orders submitted through this site are subject to confirmation by store staff. Orders with Cash on Delivery are payable upon handover. Orders placed via Easypaisa or Bank Transfer require verification of payment receipt before dispatch.
            </p>

            <h3 className="text-base font-bold text-stone-900">4. Returns & Freshness Guarantee</h3>
            <p>
              If any item received does not match your order or has suffered damage, notify us immediately upon delivery for a prompt exchange or refund.
            </p>
          </>
        )}
      </div>

      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
        <span>This is an editable placeholder policy tailored for Sheeraz General Store.</span>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="text-emerald-800 font-bold hover:underline cursor-pointer"
        >
          Edit Store Settings
        </button>
      </div>
    </div>
  );
};
