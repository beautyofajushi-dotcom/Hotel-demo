const rawContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '';
const rawPropertyAddress = process.env.NEXT_PUBLIC_PROPERTY_ADDRESS?.trim() || '';
const rawMapsUrl = process.env.NEXT_PUBLIC_MAPS_URL?.trim() || '';
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || '';

function safeWebUrl(value: string) {
  if (!value) return '';
  try {
    const url = new URL(value);
    if ((url.protocol !== 'https:' && url.protocol !== 'http:') || url.username || url.password) return '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return '';
  }
}

const safeContactEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(rawContactEmail)
  ? rawContactEmail
  : '';

export const SITE_NAME = 'Aranya Himalayan House';
export const SITE_REGION = 'Kumaon, Uttarakhand, India';
export const SITE_CONTACT_EMAIL = safeContactEmail;
export const SITE_CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || '';
export const SITE_PROPERTY_ADDRESS = rawPropertyAddress;
export const SITE_PROPERTY_ADDRESS_IS_CONFIGURED = Boolean(rawPropertyAddress);
export const SITE_MAPS_URL = safeWebUrl(rawMapsUrl) || 'https://www.google.com/maps/search/?api=1&query=Kumaon%2C+Uttarakhand%2C+India';
export const SITE_MAPS_URL_IS_CONFIGURED = Boolean(safeWebUrl(rawMapsUrl));
export const SITE_WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, '') || '';
export const SITE_WHATSAPP_URL = SITE_WHATSAPP_PHONE
  ? `https://wa.me/${SITE_WHATSAPP_PHONE}?text=${encodeURIComponent('Namaste Aranya, I would like to make an enquiry.')}`
  : '';
export const SITE_URL = safeWebUrl(rawSiteUrl);
export const SITE_URL_IS_CONFIGURED = Boolean(SITE_URL);
export const SITE_EMAIL_LINK = SITE_CONTACT_EMAIL ? `mailto:${SITE_CONTACT_EMAIL}` : '';
