'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getReviews, saveReviews } from '@/lib/store';
import { Review } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { formatDate, cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  Search,
  Star,
  Trash2,
  Check,
  X,
  MessageSquare,
} from 'lucide-react';

const filterTabs = ['All', 'Approved', 'Pending'] as const;

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try { return getReviews(); } catch { return []; }
  });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.text.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Approved' && r.approved) ||
      (filter === 'Pending' && !r.approved);
    return matchesSearch && matchesFilter;
  });

  const toggleApproved = (id: string) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r));
    saveReviews(updated);
    setReviews(updated);
    const review = updated.find((r) => r.id === id);
    toast.success(review?.approved ? 'Review approved' : 'Review rejected');
  };

  const handleDelete = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    saveReviews(updated);
    setReviews(updated);
    setDeleteConfirmId(null);
    toast.success('Review deleted');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-3.5 w-3.5 transition-colors',
          i < rating ? 'fill-saffron-400 text-saffron-400' : 'text-stone-200'
        )}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Reviews</h1>
            <p className="mt-0.5 text-sm text-stone-500">
              {reviews.length} reviews ({reviews.filter((r) => !r.approved).length} pending)
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-9 pr-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
            />
          </div>
          <div className="flex gap-1 border-b border-stone-200">
            {filterTabs.map((tab) => {
              const count = tab === 'All'
                ? reviews.length
                : tab === 'Approved'
                  ? reviews.filter((r) => r.approved).length
                  : reviews.filter((r) => !r.approved).length;
              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px inline-flex items-center gap-2',
                    filter === tab
                      ? 'border-ochre-500 text-ochre-700'
                      : 'border-transparent text-stone-500 hover:text-stone-700'
                  )}
                >
                  {tab}
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-medium',
                    filter === tab ? 'bg-ochre-100 text-ochre-700' : 'bg-stone-100 text-stone-500'
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 text-left">
                  <th className="px-4 py-3 font-semibold text-stone-600">Guest</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Location</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Rating</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Review</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Date</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex flex-col items-center gap-3 py-12 text-stone-400">
                        <MessageSquare className="h-10 w-10" />
                        <p className="text-sm font-medium">No reviews found</p>
                        <p className="text-xs">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, idx) => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.02 }}
                      className="group transition-colors hover:bg-clay-50/50"
                    >
                      <td className="px-4 py-3 font-medium text-stone-800">{r.name}</td>
                      <td className="px-4 py-3 text-stone-500">{r.location}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5">{renderStars(r.rating)}</div>
                      </td>
                      <td className="px-4 py-3 text-stone-500 max-w-xs">
                        <span className="line-clamp-2 text-sm leading-snug">{r.text}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-stone-400 whitespace-nowrap">{formatDate(r.date)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleApproved(r.id)}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                            r.approved
                              ? 'bg-pine-100 text-pine-700 hover:bg-pine-200'
                              : 'bg-ochre-100 text-ochre-700 hover:bg-ochre-200'
                          )}
                        >
                          {r.approved ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          {r.approved ? 'Approved' : 'Pending'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleApproved(r.id)}
                            className={cn(
                              'rounded-lg p-1.5 transition-colors',
                              r.approved
                                ? 'text-ochre-500 hover:bg-ochre-50'
                                : 'text-pine-600 hover:bg-pine-50'
                            )}
                            aria-label={r.approved ? 'Reject review' : 'Approve review'}
                            title={r.approved ? 'Reject' : 'Approve'}
                          >
                            {r.approved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(r.id)}
                            className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                            aria-label="Delete review"
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

      <ConfirmModal
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => handleDelete(deleteConfirmId!)}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
      />
    </div>
  );
}
