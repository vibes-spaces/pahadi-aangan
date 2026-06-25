'use client';
import { useState, useMemo, useCallback } from 'react';
import { getGallery, saveGallery, generateId } from '@/lib/store';
import type { GalleryItem } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { Image, Plus, Pencil, Trash2, X, Search, Upload, Loader2 } from 'lucide-react';

const categories = ['All', 'Architecture', 'Rooms', 'Dining', 'Exterior', 'Experiences', 'Events'];

const defaultForm = { title: '', url: '', caption: '', category: 'Architecture' };

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(() => getGallery());
  const [activeCategory, setActiveCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(defaultForm);
  const [imgError, setImgError] = useState(false);

  const filtered = useMemo(() => {
    let list = items;
    if (activeCategory !== 'All') list = list.filter(i => i.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i => i.title.toLowerCase().includes(q) || (i.caption || '').toLowerCase().includes(q));
    }
    return list;
  }, [items, activeCategory, search]);

  const openAdd = useCallback(() => {
    setEditing(null);
    setForm(defaultForm);
    setImgError(false);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((item: GalleryItem) => {
    setEditing(item);
    setForm({ title: item.title, url: item.url, caption: item.caption || '', category: item.category });
    setImgError(false);
    setShowModal(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.url.trim()) { toast.error('Image URL is required'); return; }
    setSaving(true);
    try {
      let updated: GalleryItem[];
      if (editing) {
        updated = items.map(i =>
          i.id === editing.id
            ? { ...i, title: form.title.trim(), url: form.url.trim(), caption: form.caption.trim() || undefined, category: form.category }
            : i
        );
      } else {
        const newItem: GalleryItem = {
          id: generateId('G'),
          title: form.title.trim(),
          url: form.url.trim(),
          caption: form.caption.trim() || undefined,
          category: form.category,
        };
        updated = [...items, newItem];
      }
      saveGallery(updated);
      setItems(updated);
      toast.success(editing ? 'Gallery item updated' : 'Gallery item added');
      setShowModal(false);
    } catch {
      toast.error('Failed to save gallery item');
    } finally {
      setSaving(false);
    }
  }, [form, editing, items]);

  const handleDelete = useCallback(() => {
    if (!deleteConfirmId) return;
    try {
      const updated = items.filter(i => i.id !== deleteConfirmId);
      saveGallery(updated);
      setItems(updated);
      setDeleteConfirmId(null);
      toast.success('Gallery item deleted');
    } catch {
      toast.error('Failed to delete gallery item');
    }
  }, [items, deleteConfirmId]);

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Gallery</h1>
            <p className="text-sm text-stone-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-ochre-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ochre-500 transition-all shadow-lg shadow-ochre-600/20">
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search gallery..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-ochre-600 text-white shadow-md shadow-ochre-600/20'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-stone-200">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
              <Image className="w-7 h-7 text-stone-300" />
            </div>
            <p className="text-stone-500 font-medium">No images found</p>
            <p className="text-sm text-stone-400 mt-1">{search ? 'Try a different search term' : 'Click "Add Image" to get started'}</p>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, idx) => (
            <FadeIn key={item.id} delay={Math.min(idx * 0.03, 0.3)}>
              <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/e8e3da/7a7365?text=No+Image'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openEdit(item)}
                      aria-label="Edit image"
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-stone-700 hover:bg-ochre-600 hover:text-white transition-all shadow-lg"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      aria-label="Delete image"
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-ochre-600 bg-ochre-50 px-2.5 py-1 rounded-full">{item.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900 mt-2">{item.title}</h3>
                  {item.caption && <p className="text-xs text-stone-500 mt-1 line-clamp-2">{item.caption}</p>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-stone-900">{editing ? 'Edit Image' : 'Add Image'}</h2>
              <button onClick={() => setShowModal(false)} aria-label="Close modal" className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                  placeholder="Image title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Image URL <span className="text-red-500">*</span></label>
                <input
                  value={form.url}
                  onChange={e => { setForm({ ...form, url: e.target.value }); setImgError(false); }}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              {form.url && (
                <div className="rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  {imgError ? (
                    <div className="flex items-center justify-center h-40 text-stone-400 text-sm">
                      <Upload className="w-5 h-5 mr-2" /> Unable to load preview
                    </div>
                  ) : (
                    <img
                      src={form.url}
                      alt="Preview"
                      loading="lazy"
                      className="w-full h-40 object-cover"
                      onError={() => setImgError(true)}
                    />
                  )}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Caption</label>
                <input
                  value={form.caption}
                  onChange={e => setForm({ ...form, caption: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                  placeholder="Optional caption"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 bg-white"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ochre-600 text-white font-semibold hover:bg-ochre-500 transition-all shadow-lg shadow-ochre-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? 'Update' : 'Add Image'}
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Gallery Item"
        message="Are you sure you want to delete this gallery item? This action cannot be undone."
      />
    </div>
  );
}
