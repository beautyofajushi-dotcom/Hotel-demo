import type { Metadata } from 'next';
import { DiningPage } from '@/components/more-pages';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/dining' } } : {}),
  title: 'Dining',
  description: 'Ask about current dining options. Any sample dishes shown here are illustrative, not a live menu.',
};

export default function Page() {
  return <DiningPage />;
}
