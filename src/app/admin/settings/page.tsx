'use client';
import { useState, useCallback } from 'react';
import { getSiteSettings, saveSiteSettings, resetAllData } from '@/lib/store';
import type { SiteSettings } from '@/lib/store';
import FadeIn from '@/components/animations/FadeIn';
import toast from 'react-hot-toast';
import { Settings, Save, AlertTriangle, RefreshCw, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings>(() => getSiteSettings());
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSave = useCallback(() => {
    setSaving(true);
    const data: SiteSettings = {
      ...form,
      phones: typeof form.phones === 'string'
        ? (form.phones as unknown as string).split(',').map(p => p.trim()).filter(Boolean)
        : form.phones,
    };
    saveSiteSettings(data);
    setForm(data);
    toast.success('Settings saved successfully');
    setSaving(false);
  }, [form]);

  const handleChange = useCallback(<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    if (!confirmReset) { setConfirmReset(true); return; }
    resetAllData();
    toast.success('All data has been reset. Reloading...');
    setTimeout(() => window.location.reload(), 1500);
  }, [confirmReset]);

  const phonesValue = typeof form.phones === 'string'
    ? form.phones as unknown as string
    : form.phones.join(', ');

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Site Settings</h1>
            <p className="text-sm text-stone-500 mt-1">Manage your property information</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-ochre-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ochre-500 transition-all shadow-lg shadow-ochre-600/20 disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FadeIn delay={0.05}>
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-stone-500" />
                <h2 className="text-base font-semibold text-stone-900">Hero Section</h2>
              </div>
              <p className="text-xs text-stone-500 mb-4">Main banner content on the homepage</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Hero Title</label>
                  <input
                    value={form.heroTitle}
                    onChange={e => handleChange('heroTitle', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="Welcome to Pahadi Aangan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Hero Subtitle</label>
                  <input
                    value={form.heroSubtitle}
                    onChange={e => handleChange('heroSubtitle', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="A Heritage Retreat in the Heart of Himachal"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h2 className="text-base font-semibold text-stone-900 mb-1">About Section</h2>
              <p className="text-xs text-stone-500 mb-4">About the property content</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">About Text</label>
                  <textarea
                    value={form.aboutText}
                    onChange={e => handleChange('aboutText', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 resize-none"
                    placeholder="Brief description of the property"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">About Story</label>
                  <textarea
                    value={form.aboutStory}
                    onChange={e => handleChange('aboutStory', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 resize-none"
                    placeholder="The full story behind Pahadi Aangan..."
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h2 className="text-base font-semibold text-stone-900 mb-1">Contact Information</h2>
              <p className="text-xs text-stone-500 mb-4">Address, phones, and email details</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Address
                  </label>
                  <input
                    value={form.address}
                    onChange={e => handleChange('address', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="Short address line"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Full Address
                  </label>
                  <input
                    value={form.addressFull}
                    onChange={e => handleChange('addressFull', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="Complete address for maps"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    <Phone className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Phones (comma separated)
                  </label>
                  <input
                    value={phonesValue}
                    onChange={e => handleChange('phones', e.target.value as unknown as string[])}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="+91 98000 00000, +91 98000 00001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    <Mail className="w-3.5 h-3.5 inline mr-1.5 text-stone-400" />Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="stay@pahadiaangan.in"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h2 className="text-base font-semibold text-stone-900 mb-1">
                <Clock className="w-4 h-4 inline mr-1.5 text-stone-400" />Check-in / Check-out
              </h2>
              <p className="text-xs text-stone-500 mb-4">Property timing policies</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Check-in Time</label>
                  <input
                    value={form.checkIn}
                    onChange={e => handleChange('checkIn', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="2:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Check-out Time</label>
                  <input
                    value={form.checkOut}
                    onChange={e => handleChange('checkOut', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="11:00 AM"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h2 className="text-base font-semibold text-stone-900 mb-1">Quick Summary</h2>
              <p className="text-xs text-stone-500 mb-4">Current saved values</p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-stone-500 text-xs">Hero Title</span>
                  <p className="text-stone-900 font-medium truncate">{form.heroTitle || '—'}</p>
                </div>
                <div>
                  <span className="text-stone-500 text-xs">Email</span>
                  <p className="text-stone-900 font-medium truncate">{form.email || '—'}</p>
                </div>
                <div>
                  <span className="text-stone-500 text-xs">Check-in / Check-out</span>
                  <p className="text-stone-900 font-medium">{form.checkIn || '—'} / {form.checkOut || '—'}</p>
                </div>
                <div>
                  <span className="text-stone-500 text-xs">Phones</span>
                  <p className="text-stone-900 font-medium truncate">{phonesValue || '—'}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-white rounded-2xl border border-red-200 p-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h2 className="text-base font-semibold text-red-700">Danger Zone</h2>
              </div>
              <p className="text-xs text-stone-500 mb-4">Irreversible actions — proceed with caution</p>
              <button
                onClick={handleReset}
                className={confirmReset
                  ? 'w-full px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition-all shadow-lg shadow-red-600/20'
                  : 'w-full px-4 py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all'
                }
              >
                {confirmReset ? 'Click again to confirm reset' : 'Reset All Data'}
              </button>
              {confirmReset && (
                <button
                  onClick={() => setConfirmReset(false)}
                  className="w-full mt-2 px-4 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
