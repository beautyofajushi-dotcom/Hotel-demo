import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ExperienceProvider } from '@/components/experience-context';
import { SiteHeader } from '@/components/site-header';
import { BookingModal, FloatingActions, RouteLoader, SiteFooter, SmoothScroll } from '@/components/site-chrome';
import { SITE_URL, SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

const brandTitle = 'Aranya Himalayan House — Hotel Resort & Wellness Clinic';
const brandDescription = 'An enquiry preview for two distinct experiences: a Himalayan hotel resort and a wellness clinic. Confirm the operating location, facilities, services and provider details before planning a visit.';
const illustrativeImage = '/images/kumaon-retreat.webp';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: '/' },
  } : {}),
  title: {
    default: brandTitle,
    template: '%s | Aranya Himalayan House',
  },
  description: brandDescription,
  applicationName: 'Aranya Himalayan House',
  keywords: ['Himalayan hotel resort India', 'Kumaon hotel resort', 'Kumaon wellness clinic', 'Uttarakhand retreat'],
  openGraph: {
    title: 'Aranya Himalayan House · Hotel Resort + Wellness Clinic',
    description: brandDescription,
    type: 'website',
    ...(SITE_URL_IS_CONFIGURED ? {
      url: SITE_URL,
      images: [{ url: illustrativeImage, width: 1200, height: 630, alt: 'Illustrative Himalayan hotel resort concept image' }],
    } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aranya Himalayan House · Hotel Resort + Wellness Clinic',
    description: brandDescription,
    ...(SITE_URL_IS_CONFIGURED ? { images: [illustrativeImage] } : {}),
  },
  robots: { index: SITE_URL_IS_CONFIGURED, follow: SITE_URL_IS_CONFIGURED },
};

export const viewport: Viewport = {
  themeColor: '#0b0f0e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <ExperienceProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          {children}
          <SiteFooter />
          <FloatingActions />
          <BookingModal />
          <RouteLoader />
          <SmoothScroll />
        </ExperienceProvider>
      </body>
    </html>
  );
}
