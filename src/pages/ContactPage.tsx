import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { storeConfig, setIsSettingsOpen, showToast, navigateTo } = useStore();

  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formSubject, setFormSubject] = useState('Grocery Order Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim() || !formMessage.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setStatus('success');
    showToast('Your message has been sent to Sheeraz General Store!');
    setFormName('');
    setFormContact('');
    setFormMessage('');
    setTimeout(() => {
      setStatus('idle');
    }, 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-emerald-800 transition cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-emerald-900 font-bold">Contact Us</span>
      </div>

      {/* Header */}
      <div>
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
          Reach Our Shop
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          Contact Sheeraz General Store
        </h1>
        <p className="text-sm text-stone-700 mt-1 max-w-2xl">
          Have an inquiry about stock availability, bulk grain orders, local delivery in Khattak, or mobile balance recharge? Send us a message or call our counter directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information & Map Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Info cards */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-3">
              Store Details (Khattak)
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-700 block uppercase">
                    Store Address (Editable)
                  </span>
                  <p className="text-stone-900 font-medium mt-0.5 leading-snug">
                    {storeConfig.addressPlaceholder}
                  </p>
                  <span className="text-[11px] text-emerald-800 font-medium">
                    Community: Khattak, KP
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-700 block uppercase">
                    Phone / WhatsApp (Editable)
                  </span>
                  <p className="text-stone-900 font-medium mt-0.5 font-mono">
                    {storeConfig.phonePlaceholder}
                  </p>
                  <span className="text-[11px] text-stone-600">
                    Direct counter assistance with Fahad Islam & Sadam Hussain
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-700 block uppercase">
                    Email Inquiries (Editable)
                  </span>
                  <p className="text-stone-900 font-medium mt-0.5">
                    {storeConfig.emailPlaceholder}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-700 block uppercase">
                    Store Opening Hours
                  </span>
                  <p className="text-stone-900 font-medium mt-0.5">
                    {storeConfig.openingHoursPlaceholder}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-stone-300"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
                <span>Customize Contact Placeholders</span>
              </button>
            </div>
          </div>

          {/* Interactive Map Placeholder (Khattak) */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span className="text-xs font-bold text-stone-900">
                  Map View • Khattak, KP
                </span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded-sm">
                Interactive Preview
              </span>
            </div>

            <div className="relative aspect-16/10 bg-stone-100 flex items-center justify-center p-6 text-center">
              <div className="space-y-2 max-w-xs">
                <div className="w-12 h-12 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center mx-auto shadow-md animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-stone-900 font-serif">
                  Sheeraz General Store
                </h4>
                <p className="text-xs text-stone-600">
                  {storeConfig.addressPlaceholder}
                </p>
                <p className="text-[11px] text-stone-600 pt-1">
                  Local neighborhood storefront with street-level customer access and curbside bike parking in Khattak.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs">
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold font-serif text-stone-900">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-stone-700">
                Leave your name and phone number or email, and our store team will respond promptly.
              </p>
            </div>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-950">
                  <strong className="block font-bold">Thank you for contacting Sheeraz General Store!</strong>
                  Your inquiry has been received. Fahad Islam or Sadam Hussain will get back to you shortly.
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-red-800">
                  {errorMessage}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Tariq Khan"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Phone Number or Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formContact}
                  onChange={(e) => setFormContact(e.target.value)}
                  placeholder="e.g. 03XX-XXXXXXX or user@email.com"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 font-medium focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                >
                  <option value="Grocery Order Inquiry">Grocery Order / Item Availability</option>
                  <option value="Mobile Top-Up / Easypaisa Help">Mobile Top-Up / Easypaisa Assistance</option>
                  <option value="Bulk Order or Event Supply">Bulk Grain / Event Drinks Order</option>
                  <option value="Home Delivery in Khattak">Home Delivery Coverage in Khattak</option>
                  <option value="General Store Question">General Question for Store Owners</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Tell us what items or assistance you need..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
