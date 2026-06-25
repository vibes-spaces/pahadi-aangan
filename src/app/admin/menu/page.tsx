'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMenuItems, saveMenuItems, generateId } from '@/lib/store';
import { MenuItem } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Utensils,
  Loader2,
} from 'lucide-react';

interface MenuForm {
  name: string;
  description: string;
  price: string;
  category: string;
  traditional: boolean;
}

const emptyForm: MenuForm = {
  name: '',
  description: '',
  price: '',
  category: 'Main Course',
  traditional: false,
};

const categories = ['All', 'Starters', 'Main Course', 'Breads', 'Desserts', 'Beverages', 'Specialty', 'Soups'];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>(() => {
    try { return getMenuItems(); } catch { return []; }
  });
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MenuForm>(emptyForm);



  const filtered = activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const openAdd = () => { resetForm(); setModalOpen(true); };

  const openEdit = (item: MenuItem) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      traditional: item.traditional || false,
    });
    setEditingId(item.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!form.price.trim()) {
      toast.error('Price is required');
      return;
    }
    setSaving(true);
    let all = getMenuItems();
    if (editingId) {
      all = all.map((i) => (i.id === editingId ? { ...i, ...form } : i));
      toast.success('Menu item updated');
    } else {
      const newItem: MenuItem = { ...form, id: generateId('MI') };
      all.push(newItem);
      toast.success('Menu item created');
    }
    saveMenuItems(all);
    setItems(all);
    setModalOpen(false);
    setSaving(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    const all = getMenuItems().filter((i) => i.id !== id);
    saveMenuItems(all);
    setItems(all);
    setDeleteConfirmId(null);
    toast.success('Menu item deleted');
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Menu</h1>
            <p className="mt-0.5 text-sm text-stone-500">{items.length} items</p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-ochre-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ochre-500 hover:shadow"
          >
            <Plus className="h-4 w-4" /> Add Menu Item
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex flex-wrap gap-1 border-b border-stone-200">
          {categories.map((cat) => {
            const count = cat === 'All' ? items.length : items.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px inline-flex items-center gap-2',
                  activeCategory === cat
                    ? 'border-ochre-500 text-ochre-700'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                )}
              >
                {cat}
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-medium',
                  activeCategory === cat ? 'bg-ochre-100 text-ochre-700' : 'bg-stone-100 text-stone-500'
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 text-left">
                  <th className="px-4 py-3 font-semibold text-stone-600">Name</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Description</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Price</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Category</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Traditional</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex flex-col items-center gap-3 py-12 text-stone-400">
                        <Utensils className="h-10 w-10" />
                        <p className="text-sm font-medium">No menu items found</p>
                        <p className="text-xs">Try adjusting your category filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.02 }}
                      className="group transition-colors hover:bg-clay-50/50"
                    >
                      <td className="px-4 py-3 font-medium text-stone-800">{item.name}</td>
                      <td className="px-4 py-3 text-stone-500 max-w-xs truncate">{item.description}</td>
                      <td className="px-4 py-3 font-medium text-stone-800">{item.price.startsWith('₹') ? item.price : `₹${item.price}`}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-clay-100 px-2.5 py-0.5 text-xs font-medium text-stone-600">{item.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        {item.traditional ? (
                          <span className="rounded-full bg-ochre-100 px-2.5 py-0.5 text-xs font-medium text-ochre-700">Traditional</span>
                        ) : (
                          <span className="text-stone-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(item)}
                            className="rounded-lg p-1.5 text-stone-400 hover:bg-ochre-50 hover:text-ochre-600 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

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
                <h2 className="text-lg font-bold text-stone-900">{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
                <button onClick={() => { setModalOpen(false); resetForm(); }} aria-label="Close modal" className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-stone-600">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    placeholder="e.g. Siddu"
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
                  <label className="mb-1.5 block text-xs font-semibold text-stone-600">Price (₹)</label>
                  <input
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    placeholder="e.g. ₹280"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-stone-600">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                  >
                    {categories.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-stone-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={form.traditional}
                    onChange={(e) => setForm({ ...form, traditional: e.target.checked })}
                    className="h-4 w-4 rounded border-stone-300 text-ochre-600 focus:ring-ochre-400"
                  />
                  Traditional Dish
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
                    {editingId ? 'Update' : 'Create'}
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
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item? This action cannot be undone."
      />
    </div>
  );
}
