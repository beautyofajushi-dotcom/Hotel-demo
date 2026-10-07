import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/privacy-page';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy & Enquiries',
  description: 'How the enquiry preview handles form submissions and saved experience preferences.',
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/privacy' } } : {}),
};

export default function Page() {
  return <PrivacyPage />;
}
