import type { MetadataRoute } from 'next';
import { SITE_URL, SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

const publicRoutes = [
  { path: '/', priority: 1 },
  { path: '/stay', priority: 0.8 },
  { path: '/spaces', priority: 0.8 },
  { path: '/wellness', priority: 0.8 },
  { path: '/dining', priority: 0.7 },
  { path: '/experiences', priority: 0.7 },
  { path: '/gallery', priority: 0.6 },
  { path: '/journal', priority: 0.6 },
  { path: '/contact', priority: 0.7 },
  { path: '/privacy', priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL_IS_CONFIGURED) return [];

  return publicRoutes.map(({ path, priority }) => ({
    url: new URL(path, `${SITE_URL}/`).toString(),
    changeFrequency: path === '/journal' ? 'monthly' : 'yearly',
    priority,
  }));
}
