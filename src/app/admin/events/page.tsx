'use client';
import { useState, useCallback } from 'react';
import { getEvents, saveEvents, generateId } from '@/lib/store';
import type { Event } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { PartyPopper, Plus, Pencil, Trash2, X, Users, IndianRupee, Gem, Building, Cake, Landmark, Loader2 } from 'lucide-react';

const iconOptions = [
  { value: 'Gem', label: 'Ring', icon: Gem },
  { value: 'Building', label: 'Building', icon: Building },
  { value: 'Cake', label: 'Cake', icon: Cake },
  { value: 'Landmark', label: 'Temple', icon: Landmark },
];

const categoryOptions = ['wedding', 'corporate', 'celebration', 'cultural'] as const;

const categoryColors: Record<string, string> = {
  wedding: 'bg-pink-100 text-pink-700',
  corporate: 'bg-blue-100 text-blue-700',
  celebration: 'bg-purple-100 text-purple-700',
  cultural: 'bg-ochre-100 text-ochre-700',
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ElementType> = { Gem, Building, Cake, Landmark, PartyPopper, Users };
  const Icon = icons[name] || PartyPopper;
  return <Icon className={className || 'w-5 h-5'} />;
}

const defaultForm = { title: '', description: '', capacity: '', pricing: '', icon: 'Gem', features: '', category: 'wedding' as Event['category'] };

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>(() => getEvents());
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const openAdd = useCallback(() => {
    setEditing(null);
    setForm(defaultForm);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((ev: Event) => {
    setEditing(ev);
    setForm({ title: ev.title, description: ev.description, capacity: ev.capacity, pricing: ev.pricing, icon: ev.icon, features: ev.features.join(', '), category: ev.category });
    setShowModal(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setSaving(true);
    try {
      const features = form.features.split(',').map(f => f.trim()).filter(Boolean);
      let updated: Event[];
      if (editing) {
        updated = events.map(e => e.id === editing.id ? { ...e, ...form, title: form.title.trim(), features } : e);
      } else {
        const newEvent: Event = { ...form, id: generateId('EV'), title: form.title.trim(), features };
        updated = [...events, newEvent];
      }
      saveEvents(updated);
      setEvents(updated);
      toast.success(editing ? 'Event updated' : 'Event created');
      setShowModal(false);
    } catch {
      toast.error('Failed to save event');
    } finally {
      setSaving(false);
    }
  }, [form, editing, events]);

  const handleDelete = useCallback(() => {
    if (!deleteConfirmId) return;
    try {
      const updated = events.filter(e => e.id !== deleteConfirmId);
      saveEvents(updated);
      setEvents(updated);
      setDeleteConfirmId(null);
      toast.success('Event deleted');
    } catch {
      toast.error('Failed to delete event');
    }
  }, [events, deleteConfirmId]);

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Events</h1>
            <p className="text-sm text-stone-500 mt-1">{events.length} event{events.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-ochre-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ochre-500 transition-all shadow-lg shadow-ochre-600/20">
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
      </FadeIn>

      {events.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-stone-200">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
              <PartyPopper className="w-7 h-7 text-stone-300" />
            </div>
            <p className="text-stone-500 font-medium">No events yet</p>
            <p className="text-sm text-stone-400 mt-1">Click &quot;Add Event&quot; to create one</p>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {events.map((ev, idx) => (
            <FadeIn key={ev.id} delay={Math.min(idx * 0.08, 0.3)}>
              <div className="bg-white rounded-2xl border border-stone-200 p-5 hover:shadow-xl transition-all duration-300 relative group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ochre-50 flex items-center justify-center text-ochre-600 flex-shrink-0">
                    <DynamicIcon name={ev.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-stone-900">{ev.title}</h3>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${categoryColors[ev.category] || 'bg-stone-100 text-stone-600'}`}>{ev.category}</span>
                    </div>
                    <p className="text-sm text-stone-600 line-clamp-2 mb-3">{ev.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-stone-500">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {ev.capacity}</span>
                      <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" /> {ev.pricing}</span>
                    </div>
                    {ev.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ev.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                        {ev.features.length > 3 && <span className="text-xs text-stone-400">+{ev.features.length - 3} more</span>}
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(ev)} aria-label="Edit event" className="p-2 rounded-lg bg-white shadow text-stone-400 hover:text-ochre-600 hover:bg-ochre-50 transition-all">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirmId(ev.id)} aria-label="Delete event" className="p-2 rounded-lg bg-white shadow text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
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
              <h2 className="text-lg font-bold text-stone-900">{editing ? 'Edit Event' : 'Add Event'}</h2>
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
                  placeholder="Event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 resize-none"
                  placeholder="Describe the event..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Capacity</label>
                  <input
                    value={form.capacity}
                    onChange={e => setForm({ ...form, capacity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="e.g. 200 guests"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Pricing</label>
                  <input
                    value={form.pricing}
                    onChange={e => setForm({ ...form, pricing: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="e.g. ₹950 per person"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Icon</label>
                  <select
                    value={form.icon}
                    onChange={e => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 bg-white"
                  >
                    {iconOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value as Event['category'] })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 bg-white"
                  >
                    {categoryOptions.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Features (comma separated)</label>
                <input
                  value={form.features}
                  onChange={e => setForm({ ...form, features: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
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
                {editing ? 'Update' : 'Add Event'}
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
}
