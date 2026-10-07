import type { Metadata } from 'next';
import { ExperiencesPage } from '@/components/more-pages';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/experiences' } } : {}),
  title: 'Experiences',
  description: 'Ask about current resort experiences, schedules, access, availability and accessibility.',
};

export default function Page() {
  return <ExperiencesPage />;
}
