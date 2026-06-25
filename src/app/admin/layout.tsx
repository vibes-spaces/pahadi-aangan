'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Bed, Utensils, Users, Star, BarChart3,
  Tag, Image, FileText, PartyPopper, UserCog, Settings,
  LogOut, Menu, X, ExternalLink, Trees,
} from 'lucide-react';
import { logout } from '@/lib/auth';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/rooms', label: 'Rooms', icon: Bed },
  { href: '/admin/menu', label: 'Menu', icon: Utensils },
  { href: '/admin/guests', label: 'Guests', icon: Users },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/offers', label: 'Offers', icon: Tag },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/events', label: 'Events', icon: PartyPopper },
  { href: '/admin/staff', label: 'Staff', icon: UserCog },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin';

  const handleSignOut = useCallback(async () => {
    await logout();
    router.push('/admin');
  }, [router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const currentPage = sidebarLinks.find(l => l.href === pathname);
  const pageTitle = currentPage?.label || 'Admin';

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-stone-900 text-stone-300 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-stone-700 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ochre-600">
              <Trees className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">Pahadi Aangan</p>
              <p className="text-[10px] text-stone-400 leading-tight">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-stone-400 hover:text-white" aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {sidebarLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-ochre-500/15 text-ochre-400 border border-ochre-500/20'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-transparent'
                }`}
              >
                <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-stone-700 p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Top header - shorter, cleaner */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-stone-200 bg-white/95 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="-ml-1 flex items-center justify-center rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-1 items-center justify-between min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="hidden sm:inline text-stone-400 text-sm font-medium">Admin</span>
              <span className="hidden sm:inline text-stone-300">/</span>
              <h1 className="text-sm font-semibold text-stone-800 truncate">{pageTitle}</h1>
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 shrink-0"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}