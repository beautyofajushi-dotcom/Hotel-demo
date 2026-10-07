import type { Metadata } from 'next';
import { StayPage } from '@/components/more-pages';
import { SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(SITE_URL_IS_CONFIGURED ? { alternates: { canonical: '/stay' } } : {}),
  title: 'Hotel Resort Stay Enquiries',
  description: 'Ask about current room types, rates, facilities, exact location and stay policies. Details require confirmation.',
};

export default function Page() {
  return <StayPage />;
}
