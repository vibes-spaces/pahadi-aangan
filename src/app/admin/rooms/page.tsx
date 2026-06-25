'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRooms, saveRooms, generateId } from '@/lib/store';
import { Room } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  Plus,
  Edit,
  Trash2,
  Bed,
  Users,
  Maximize2,
  X,
  Home,
  Loader2,
} from 'lucide-react';

interface RoomForm {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  size: string;
  capacity: number;
  bedType: string;
  amenities: string[];
  featured: boolean;
  available: boolean;
  traditional: string;
}

const emptyForm: RoomForm = {
  title: '',
  subtitle: '',
  description: '',
  longDescription: '',
  price: 0,
  size: '',
  capacity: 2,
  bedType: '',
  amenities: [],
  featured: false,
  available: true,
  traditional: '',
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(() => {
    try { return getRooms(); } catch { return []; }
  });
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RoomForm>(emptyForm);
  const [amenitiesInput, setAmenitiesInput] = useState('');



  const resetForm = () => {
    setForm(emptyForm);
    setAmenitiesInput('');
    setEditingId(null);
  };

  const openAdd = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (room: Room) => {
    setForm({
      title: room.title,
      subtitle: room.subtitle,
      description: room.description,
      longDescription: room.longDescription,
      price: room.price,
      size: room.size,
      capacity: room.capacity,
      bedType: room.bedType,
      amenities: room.amenities,
      featured: room.featured,
      available: room.available,
      traditional: room.traditional,
    });
    setAmenitiesInput(room.amenities.join(', '));
    setEditingId(room.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!form.price || form.price <= 0) {
      toast.error('Valid price is required');
      return;
    }
    setSaving(true);
    const amenities = amenitiesInput
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    let all = getRooms();
    if (editingId) {
      all = all.map((r) =>
        r.id === editingId
          ? { ...r, ...form, amenities, images: r.images }
          : r
      );
      toast.success('Room updated');
    } else {
      const slug = form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const newRoom: Room = {
        ...form,
        id: generateId('RM'),
        slug,
        images: [],
        amenities,
      };
      all.push(newRoom);
      toast.success('Room created');
    }
    saveRooms(all);
    setRooms(all);
    setModalOpen(false);
    setSaving(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    const all = getRooms().filter((r) => r.id !== id);
    saveRooms(all);
    setRooms(all);
    setDeleteConfirmId(null);
    toast.success('Room deleted');
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Rooms</h1>
            <p className="mt-0.5 text-sm text-stone-500">{rooms.length} rooms</p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-ochre-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ochre-500 hover:shadow"
          >
            <Plus className="h-4 w-4" /> Add New Room
          </button>
        </div>
      </FadeIn>

      {rooms.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center gap-3 py-16 text-stone-400">
            <Home className="h-12 w-12" />
            <p className="text-sm font-medium">No rooms yet</p>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-lg bg-ochre-600 px-4 py-2 text-sm font-medium text-white hover:bg-ochre-500 transition-colors"
            >
              <Plus className="h-4 w-4" /> Add Your First Room
            </button>
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={0.1}>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room, idx) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="group rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-stone-100">
                  {room.images.length > 0 ? (
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-stone-300">
                      <Bed className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-white drop-shadow-sm">
                      {formatPrice(room.price)}
                      <span className="text-xs font-normal">/night</span>
                    </span>
                    <div className="flex gap-1.5">
                      {!room.available && (
                        <span className="rounded-md bg-red-500/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">Unavailable</span>
                      )}
                      {room.featured && (
                        <span className="rounded-md bg-ochre-500/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">Featured</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-stone-900">{room.title}</h3>
                  <p className="mt-0.5 text-xs text-stone-500">{room.subtitle}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-stone-500">
                    <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{room.capacity} guests</span>
                    <span className="inline-flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" />{room.size}</span>
                    <span className="inline-flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{room.bedType}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {room.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="rounded-full bg-clay-100 px-2 py-0.5 text-xs text-stone-600">{a}</span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="rounded-full bg-clay-100 px-2 py-0.5 text-xs text-stone-400">+{room.amenities.length - 4}</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-3">
                    <button
                      onClick={() => openEdit(room)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition-all hover:bg-ochre-50 hover:border-ochre-200 hover:text-ochre-700"
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(room.id)}
                      className="flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                      aria-label={`Delete ${room.title}`}
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
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-stone-900">{editingId ? 'Edit Room' : 'Add New Room'}</h2>
                <button onClick={() => { setModalOpen(false); resetForm(); }} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                      placeholder="e.g. Kathkuni Kutiya"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Subtitle</label>
                    <input
                      value={form.subtitle}
                      onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                      placeholder="e.g. A traditional stone & wood cottage"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Description</label>
                    <textarea
                      rows={2}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Long Description</label>
                    <textarea
                      rows={3}
                      value={form.longDescription}
                      onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Price (₹/night)</label>
                    <input
                      type="number"
                      value={form.price || ''}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Size</label>
                    <input
                      value={form.size}
                      onChange={(e) => setForm({ ...form, size: e.target.value })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                      placeholder="e.g. 380 sqft"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Capacity</label>
                    <input
                      type="number"
                      value={form.capacity}
                      onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Bed Type</label>
                    <input
                      value={form.bedType}
                      onChange={(e) => setForm({ ...form, bedType: e.target.value })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                      placeholder="e.g. King Bed"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Amenities (comma separated)</label>
                    <input
                      value={amenitiesInput}
                      onChange={(e) => setAmenitiesInput(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                      placeholder="WiFi, AC, TV, Mini Bar..."
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600">Traditional</label>
                    <input
                      value={form.traditional}
                      onChange={(e) => setForm({ ...form, traditional: e.target.value })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
                      placeholder="e.g. Built in authentic Kathkuni style"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-6">
                    <label className="inline-flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="h-4 w-4 rounded border-stone-300 text-ochre-600 focus:ring-ochre-400"
                      />
                      Featured
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.available}
                        onChange={(e) => setForm({ ...form, available: e.target.checked })}
                        className="h-4 w-4 rounded border-stone-300 text-ochre-600 focus:ring-ochre-400"
                      />
                      Available
                    </label>
                  </div>
                </div>
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
                    {editingId ? 'Update Room' : 'Create Room'}
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
        title="Delete Room"
        message="Are you sure you want to delete this room? This action cannot be undone."
      />
    </div>
  );
}
