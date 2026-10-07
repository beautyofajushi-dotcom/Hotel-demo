import type { Metadata } from 'next';
import { ContactPage } from '@/components/more-pages';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/contact' } } : {}),
  title: 'Visit & Contact',
  description: 'Send a resort or wellness-clinic enquiry. Confirm the exact property address and arrival details before travelling.',
};

export default function Page() {
  return <ContactPage />;
}
