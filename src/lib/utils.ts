import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-ochre-100 text-ochre-800',
    confirmed: 'bg-pine-100 text-pine-800',
    'checked-in': 'bg-blue-100 text-blue-800',
    'checked-out': 'bg-stone-100 text-stone-800',
    cancelled: 'bg-red-100 text-red-800',
    active: 'bg-pine-100 text-pine-800',
    inactive: 'bg-stone-100 text-stone-800',
    paid: 'bg-pine-100 text-pine-800',
    refunded: 'bg-ochre-100 text-ochre-800',
  };
  return colors[status] || 'bg-stone-100 text-stone-800';
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

export function generateId(prefix: string = ''): string {
  return prefix + Math.random().toString(36).substring(2, 8).toUpperCase();
}
