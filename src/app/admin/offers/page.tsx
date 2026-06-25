'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOffers, saveOffers, generateId } from '@/lib/store';
import { Offer } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Tag,
  Gift,
  Loader2,
} from 'lucide-react';

interface OfferForm {
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  code: string;
  featured: boolean;
}

const emptyForm: OfferForm = {
  title: '',
  description: '',
  discount: '',
  validUntil: '',
  code: '',
  featured: false,
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>(() => {
    try { return getOffers(); } catch { return []; }
  });
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<OfferForm>(emptyForm);



  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const openAdd = () => { resetForm(); setModalOpen(true); };

  const openEdit = (offer: Offer) => {
    setForm({
      title: offer.title,
      description: offer.description,
      discount: offer.discount,
      validUntil: offer.validUntil,
      code: offer.code || '',
      featured: offer.featured || false,
    });
    setEditingId(offer.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!form.discount.trim()) {
      toast.error('Discount is required');
      return;
    }
    setSaving(true);
    try {
      let all = getOffers();
      if (editingId) {
        all = all.map((o) => (o.id === editingId ? { ...o, ...form, code: form.code || undefined } : o));
      } else {
        const newOffer: Offer = { ...form, id: generateId('OF'), code: form.code || undefined };
        all.push(newOffer);
      }
      saveOffers(all);
      setOffers(all);
      toast.success(editingId ? 'Offer updated' : 'Offer created');
      setModalOpen(false);
      resetForm();
    } catch {
      toast.error('Failed to save offer');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    const all = getOffers().filter((o) => o.id !== id);
    saveOffers(all);
    setOffers(all);
    setDeleteConfirmId(null);
    toast.success('Offer deleted');
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Offers</h1>
            <p className="mt-0.5 text-sm text-stone-500">{offers.length} active offers</p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-ochre-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ochre-500 hover:shadow"
          >
            <Plus className="h-4 w-4" /> Add Offer
          </button>
        </div>
      </FadeIn>

      {offers.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center gap-3 py-16 text-stone-400">
            <Gift className="h-12 w-12" />
            <p className="text-sm font-medium">No offers yet</p>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-lg bg-ochre-600 px-4 py-2 text-sm font-medium text-white hover:bg-ochre-500 transition-colors"
            >
              <Plus className="h-4 w-4" /> Create Your First Offer
            </button>
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={0.1}>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {offers.map((offer, idx) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="group rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ochre-100">
                      <Tag className="h-5 w-5 text-ochre-600" />
                    </div>
                    {offer.featured && (
                      <span className="rounded-full bg-ochre-100 px-2.5 py-0.5 text-xs font-medium text-ochre-700">Featured</span>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-stone-900">{offer.title}</h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">{offer.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-ochre-600">{offer.discount}</span>
                    <span className="text-xs font-medium text-stone-400">OFF</span>
                  </div>
                  {offer.code && (
                    <div className="mt-2">
                      <span className="inline-block rounded border border-dashed border-stone-300 bg-clay-50 px-2.5 py-1 font-mono text-xs font-medium text-stone-700">
                        Code: {offer.code}
                      </span>
                    </div>
                  )}
                  <p className="mt-3 text-xs text-stone-400">
                    Valid until {formatDate(offer.validUntil)}
                  </p>
                  <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-3">
                    <button
                      onClick={() => openEdit(offer)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition-all hover:bg-ochre-50 hover:border-ochre-200 hover:text-ochre-700"
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(offer.id)}
                      aria-label="Delete offer"
                      className="flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => { setModalOpen(false); resetForm(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-stone-900">{editingId ? 'Edit Offer' : 'Add Offer'}</h2>
                <button onClick={() => { setModalOpen(false); resetForm(); }} aria-label="Close modal" className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-stone-600">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    placeholder="e.g. Heritage Escape"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-stone-600">Description</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-stone-600">Discount</label>
                  <input
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    placeholder="e.g. 20% Off"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-stone-600">Valid Until</label>
                  <input
                    type="date"
                    value={form.validUntil}
                    onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-stone-600">Promo Code (optional)</label>
                  <input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    placeholder="e.g. PAHADI20"
                  />
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-stone-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-stone-300 text-ochre-600 focus:ring-ochre-400"
                  />
                  Featured Offer
                </label>
                <div className="flex justify-end gap-3 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => { setModalOpen(false); resetForm(); }}
                    className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-ochre-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ochre-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editingId ? 'Update Offer' : 'Create Offer'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => handleDelete(deleteConfirmId!)}
        title="Delete Offer"
        message="Are you sure you want to delete this offer? This action cannot be undone."
      />
    </div>
  );
}
