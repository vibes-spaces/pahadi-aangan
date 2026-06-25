'use client';

import { useState } from 'react';
import { getGuests } from '@/lib/store';
import { Guest } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import { formatPrice, formatDate, getStatusColor, cn } from '@/lib/utils';
import {
  Search,
  Users,
} from 'lucide-react';

const statusFilters = ['All', 'Active', 'Inactive'] as const;

export default function GuestsPage() {
  const [guests] = useState<Guest[]>(() => {
    try { return getGuests(); } catch { return []; }
  });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || g.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Guests</h1>
            <p className="mt-0.5 text-sm text-stone-500">{guests.length} registered guests</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search guests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-9 pr-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
            />
          </div>
          <div className="flex gap-1">
            {statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                  statusFilter === s
                    ? 'bg-ochre-600 text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 text-left">
                  <th className="px-4 py-3 font-semibold text-stone-600">Name</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Email</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Phone</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Total Stays</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Total Spent</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex flex-col items-center gap-3 py-12 text-stone-400">
                        <Users className="h-10 w-10" />
                        <p className="text-sm font-medium">No guests found</p>
                        <p className="text-xs">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((g) => (
                    <tr
                      key={g.id}
                      className="group transition-colors hover:bg-clay-50/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ochre-100 text-xs font-bold text-ochre-700 ring-2 ring-white">
                            {g.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-stone-800">{g.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-stone-500">{g.email}</td>
                      <td className="px-4 py-3 text-stone-500 font-mono text-xs">{g.phone}</td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-stone-800">{g.totalStays}</span>
                      </td>
                      <td className="px-4 py-3 font-medium text-stone-800">{formatPrice(g.totalSpent)}</td>
                      <td className="px-4 py-3">
                        <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', getStatusColor(g.status))}>
                          {g.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-stone-400">{formatDate(g.joinDate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
