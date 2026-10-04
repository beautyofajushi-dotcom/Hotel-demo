import './globals.css';
import MotionEngine from '@/components/MotionEngine';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { BookingProvider } from '@/components/BookingProvider';

export const metadata = {
  title: {
    default: 'Mirāan Agra — The Taj, the city, the stay',
    template: '%s | Mirāan Agra',
  },
  description: 'A cinematic boutique hotel concept in Agra, with Taj-facing suites, considered celebrations and thoughtful vegetarian dining.',
  applicationName: 'Mirāan Agra',
  keywords: ['Agra hotel', 'Taj Mahal view', 'Agra weddings', 'vegetarian dining', 'luxury stay'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <MotionEngine />
        <BookingProvider>
          <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:bg-ivory focus:px-4 focus:py-3 focus:text-ink" href="#main-content">Skip to content</a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <WhatsAppFloat />
        </BookingProvider>
      </body>
    </html>
  );
}
