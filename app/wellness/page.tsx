import type { Metadata } from 'next';
import { WellnessPage } from '@/components/inside-pages';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/wellness' } } : {}),
  title: 'Wellness Clinic Enquiries',
  description: 'An enquiry-only clinic overview. Verify services, provider qualifications, scope, fees and appointment options before proceeding.',
};

export default function Page() {
  return <WellnessPage />;
}
