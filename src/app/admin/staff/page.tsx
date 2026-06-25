'use client';
import { useState, useMemo, useCallback } from 'react';
import { getStaff, saveStaff, generateId } from '@/lib/store';
import type { Staff } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { formatDate, cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { UserCog, Plus, Pencil, Trash2, X, Phone, Mail, Search, Loader2 } from 'lucide-react';

const statusTabs = ['all', 'active', 'inactive'] as const;

const defaultForm = { name: '', role: '', email: '', phone: '', status: 'active' as 'active' | 'inactive' };

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<Staff[]>(() => getStaff());
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Staff | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const filtered = useMemo(() => {
    let list = staff;
    if (statusFilter !== 'all') list = list.filter(s => s.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.includes(q)
      );
    }
    return list;
  }, [staff, statusFilter, search]);

  const openAdd = useCallback(() => {
    setEditing(null);
    setForm(defaultForm);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((member: Staff) => {
    setEditing(member);
    setForm({ name: member.name, role: member.role, email: member.email, phone: member.phone, status: member.status });
    setShowModal(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    if (!form.role.trim()) { toast.error('Role is required'); return; }
    setSaving(true);
    try {
      let updated: Staff[];
      if (editing) {
        updated = staff.map(s => s.id === editing.id ? { ...s, ...form, name: form.name.trim(), role: form.role.trim() } : s);
      } else {
        const newMember: Staff = {
          ...form,
          id: generateId('S'),
          name: form.name.trim(),
          role: form.role.trim(),
          joinDate: new Date().toISOString().split('T')[0],
        };
        updated = [...staff, newMember];
      }
      saveStaff(updated);
      setStaff(updated);
      toast.success(editing ? 'Staff member updated' : 'Staff member added');
      setShowModal(false);
    } catch {
      toast.error('Failed to save staff member');
    } finally {
      setSaving(false);
    }
  }, [form, editing, staff]);

  const handleDelete = useCallback(() => {
    if (!deleteConfirmId) return;
    try {
      const updated = staff.filter(s => s.id !== deleteConfirmId);
      saveStaff(updated);
      setStaff(updated);
      setDeleteConfirmId(null);
      toast.success('Staff member removed');
    } catch {
      toast.error('Failed to remove staff member');
    }
  }, [staff, deleteConfirmId]);

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Staff</h1>
            <p className="text-sm text-stone-500 mt-1">{staff.length} member{staff.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-ochre-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ochre-500 transition-all shadow-lg shadow-ochre-600/20">
            <Plus className="w-4 h-4" /> Add Member
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
              placeholder="Search staff..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
            />
          </div>
          <div className="flex gap-1.5">
            {statusTabs.map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all',
                  statusFilter === status
                    ? 'bg-ochre-600 text-white shadow-md shadow-ochre-600/20'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                )}
              >
                {status} {status !== 'all' && `(${staff.filter(s => s.status === status).length})`}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-stone-200">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
              <UserCog className="w-7 h-7 text-stone-300" />
            </div>
            <p className="text-stone-500 font-medium">No staff members found</p>
            <p className="text-sm text-stone-400 mt-1">{search ? 'Try a different search term' : 'Click "Add Member" to get started'}</p>
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={0.05}>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Name</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Role</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Email</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Phone</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Join Date</th>
                    <th className="text-center py-3.5 px-4 font-semibold text-stone-600">Status</th>
                    <th className="text-right py-3.5 px-4 font-semibold text-stone-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(member => (
                    <tr key={member.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-ochre-100 flex items-center justify-center text-ochre-700 font-semibold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="font-medium text-stone-900">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-600">{member.role}</td>
                      <td className="py-3 px-4">
                        <span className="text-stone-600 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                          <span className="truncate max-w-[160px]">{member.email}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-stone-500 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                          {member.phone}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-500 text-xs whitespace-nowrap">{formatDate(member.joinDate)}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={cn(
                            'text-xs font-medium px-2.5 py-1 rounded-full capitalize',
                            member.status === 'active' ? 'bg-pine-100 text-pine-700' : 'bg-stone-100 text-stone-600'
                          )}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(member)} aria-label="Edit staff member" className="p-2 rounded-lg text-stone-400 hover:text-ochre-600 hover:bg-ochre-50 transition-all">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirmId(member.id)} aria-label="Delete staff member" className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-stone-900">{editing ? 'Edit Staff' : 'Add Staff'}</h2>
              <button onClick={() => setShowModal(false)} aria-label="Close modal" className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Role <span className="text-red-500">*</span></label>
                  <input
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="e.g. Manager"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                    placeholder="+91 98000 00000"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.status === 'active'}
                      onChange={e => setForm({ ...form, status: e.target.checked ? 'active' : 'inactive' })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-stone-200 rounded-full peer-checked:bg-pine-600 transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                  </div>
                  <span className="text-sm font-medium text-stone-700">Active status</span>
                </label>
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
                {editing ? 'Update' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Remove Staff Member"
        message="Are you sure you want to remove this staff member? This action cannot be undone."
      />
    </div>
  );
}
