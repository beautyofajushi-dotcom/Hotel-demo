import type { Metadata } from 'next';
import { JournalPage } from '@/components/inside-pages';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/journal' } } : {}),
  title: 'Journal Preview',
  description: 'Sample editorial copy for review. Replace with fact-checked stories before publication.',
};

export default function Page() {
  return <JournalPage />;
}
