import type { Metadata } from 'next';
import { SpacesPage } from '@/components/inside-pages';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/spaces' } } : {}),
  title: 'Spaces',
  description: 'Explore the resort or clinic experience and request verified information about spaces, services and facilities.',
};

export default function Page() {
  return <SpacesPage />;
}
