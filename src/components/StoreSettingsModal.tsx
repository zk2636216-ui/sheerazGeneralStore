import React, { useState } from 'react';
import { X, SlidersHorizontal, Save, RotateCcw, CheckCircle2, Store } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { StoreConfig } from '../types';

export const StoreSettingsModal: React.FC = () => {
  const { storeConfig, updateStoreConfig, resetStoreConfig, isSettingsOpen, setIsSettingsOpen } =
    useStore();

  const [formData, setFormData] = useState<StoreConfig>(storeConfig);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'payment'>('general');

  if (!isSettingsOpen) return null;

  const handleChange = (key: keyof StoreConfig, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreConfig(formData);
    setIsSettingsOpen(false);
  };

  const handleReset = () => {
    if (confirm('Reset all store settings and placeholders to initial defaults?')) {
      resetStoreConfig();
      setIsSettingsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-8">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-serif">
                Store Customizer & Placeholders
              </h2>
              <p className="text-xs text-stone-700">
                Easily customize Sheeraz General Store contact, announcements & payment details
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-stone-200 px-6 bg-white gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'general'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-700 hover:text-stone-900'
            }`}
          >
            General & Notice Banner
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'contact'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-700 hover:text-stone-900'
            }`}
          >
            Location & Contact
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'payment'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-700 hover:text-stone-900'
            }`}
          >
            Payment Instructions (Easypaisa & Bank)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Store Announcement Banner Text
                </label>
                <textarea
                  rows={2}
                  value={formData.announcementText}
                  onChange={(e) => handleChange('announcementText', e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  placeholder="e.g. Free delivery across Khattak for orders above Rs. 1000..."
                />
                <span className="text-[11px] text-stone-600">
                  Visible on the top announcement bar across every page.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Store Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Estimated Delivery Fee Placeholder (PKR)
                </label>
                <input
                  type="number"
                  value={formData.deliveryFeePlaceholder}
                  onChange={(e) =>
                    handleChange('deliveryFeePlaceholder', Number(e.target.value))
                  }
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Delivery Policy / Schedule Notice
                </label>
                <textarea
                  rows={2}
                  value={formData.deliveryNoticePlaceholder}
                  onChange={(e) => handleChange('deliveryNoticePlaceholder', e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Store Phone Number (Placeholder)
                </label>
                <input
                  type="text"
                  value={formData.phonePlaceholder}
                  onChange={(e) => handleChange('phonePlaceholder', e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Store Physical Address (Khattak)
                </label>
                <input
                  type="text"
                  value={formData.addressPlaceholder}
                  onChange={(e) => handleChange('addressPlaceholder', e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Store WhatsApp Number (For 1-Tap Orders)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumberPlaceholder}
                  onChange={(e) => handleChange('whatsappNumberPlaceholder', e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={formData.openingHoursPlaceholder}
                  onChange={(e) => handleChange('openingHoursPlaceholder', e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Store Email (Placeholder)
                </label>
                <input
                  type="text"
                  value={formData.emailPlaceholder}
                  onChange={(e) => handleChange('emailPlaceholder', e.target.value)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                Configure local transfer options for Khattak customers. Real store credentials can be updated live.
              </div>

              {/* Easypaisa */}
              <div className="space-y-2 border-b border-stone-200 pb-4">
                <h4 className="text-xs font-bold uppercase text-emerald-900 tracking-wider">
                  Easypaisa Configuration
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Easypaisa Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.easypaisaAccountPlaceholder}
                    onChange={(e) =>
                      handleChange('easypaisaAccountPlaceholder', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Easypaisa Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.easypaisaInstructions}
                    onChange={(e) =>
                      handleChange('easypaisaInstructions', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* JazzCash */}
              <div className="space-y-2 border-b border-stone-200 pb-4">
                <h4 className="text-xs font-bold uppercase text-amber-800 tracking-wider">
                  JazzCash Configuration
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    JazzCash Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.jazzcashAccountPlaceholder}
                    onChange={(e) =>
                      handleChange('jazzcashAccountPlaceholder', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    JazzCash Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.jazzcashInstructions}
                    onChange={(e) =>
                      handleChange('jazzcashInstructions', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Raast */}
              <div className="space-y-2 border-b border-stone-200 pb-4">
                <h4 className="text-xs font-bold uppercase text-emerald-900 tracking-wider">
                  Raast Instant P2P Configuration (Zero Fee)
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Registered Raast ID (Phone or IBAN)
                  </label>
                  <input
                    type="text"
                    value={formData.raastIdPlaceholder}
                    onChange={(e) =>
                      handleChange('raastIdPlaceholder', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Raast Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.raastInstructions}
                    onChange={(e) =>
                      handleChange('raastInstructions', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-emerald-900 tracking-wider">
                  Bank Transfer Configuration
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={formData.bankNamePlaceholder}
                    onChange={(e) =>
                      handleChange('bankNamePlaceholder', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Account Title
                  </label>
                  <input
                    type="text"
                    value={formData.bankAccountTitlePlaceholder}
                    onChange={(e) =>
                      handleChange('bankAccountTitlePlaceholder', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    IBAN / Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.bankIbanPlaceholder}
                    onChange={(e) =>
                      handleChange('bankIbanPlaceholder', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Bank Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.bankInstructions}
                    onChange={(e) =>
                      handleChange('bankInstructions', e.target.value)
                    }
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4 text-amber-300" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
