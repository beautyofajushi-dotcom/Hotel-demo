import type { MetadataRoute } from 'next';
import { SITE_URL, SITE_URL_IS_CONFIGURED } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  if (!SITE_URL_IS_CONFIGURED) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: new URL('/sitemap.xml', `${SITE_URL}/`).toString(),
    host: SITE_URL,
  };
}
