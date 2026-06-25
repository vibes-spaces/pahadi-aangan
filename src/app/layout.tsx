import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import PageLoader from '@/components/layout/PageLoader';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pahadi Aangan | Heritage Retreat in Kullu, Himachal Pradesh',
  description: 'Experience the timeless elegance of traditional Himachali architecture at Pahadi Aangan. A heritage retreat in Kullu Valley with Kathkuni-style cottages, panoramic Himalayan views, and authentic Pahadi hospitality.',
  keywords: 'Pahadi Aangan, Himachal heritage resort, Kullu valley stay, Kathkuni architecture, traditional Himachali stay, Naggar resort, Pahadi cuisine, apple orchard stay',
  openGraph: {
    title: 'Pahadi Aangan | A Heritage Retreat in the Heart of Himachal',
    description: 'Traditional Kathkuni architecture meets modern luxury in the Kullu Valley. Experience authentic Himachali hospitality.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-clay-50 text-stone-900">
        <PageLoader>
          <Navbar />
          <main className="flex-1">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <Footer />
          <ScrollToTop />
        </PageLoader>
        <Toaster position="top-right" toastOptions={{
          duration: 3000,
          style: { background: '#3d3830', color: '#faf8f5', borderRadius: '12px', padding: '12px 16px', fontSize: '14px' },
          success: { iconTheme: { primary: '#4f914d', secondary: '#faf8f5' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#faf8f5' } },
        }} />
      </body>
    </html>
  );
}
