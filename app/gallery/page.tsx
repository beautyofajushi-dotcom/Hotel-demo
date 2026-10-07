import type { Metadata } from 'next';
import { GalleryPage } from '@/components/more-pages';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/gallery' } } : {}),
  title: 'Gallery',
  description: 'Illustrative concept imagery, not verified photographs of the operating property or its facilities.',
};

export default function Page() {
  return <GalleryPage />;
}
