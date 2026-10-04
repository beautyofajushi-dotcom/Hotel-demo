'use client';

import { usePathname } from 'next/navigation';

const HOTEL_WHATSAPP = process.env.NEXT_PUBLIC_HOTEL_WHATSAPP || '';
const enquiry = 'Hello Mirāan Agra, I would like to ask about a stay or wedding celebration.';
const number = HOTEL_WHATSAPP.replace(/\D/g, '');
const href = number ? `https://wa.me/${number}?text=${encodeURIComponent(enquiry)}` : `https://wa.me/?text=${encodeURIComponent(enquiry)}`;

export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname !== '/weddings') return null;
  return (
    <a className="whatsapp-float" href={href} target="_blank" rel="noreferrer" aria-label="Ask the Mirāan concierge on WhatsApp">
      <span className="whatsapp-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none"><path d="M20.2 11.8a8.1 8.1 0 0 1-11.9 7.1L4 20l1.2-4.1a8.1 8.1 0 1 1 15-4.1Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.9 8.4c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.1.4 0 .6.3.5.8 1.1 1.4 1.5.5.4 1.2.8 1.7.9.2.1.4 0 .5-.2l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .4-.2 1.1-.6 1.4-.4.4-1 .6-1.7.5-.6-.1-1.5-.4-2.6-1-1.6-1-2.7-2.4-3-2.8-.3-.5-.8-1.3-.8-2.1 0-.7.3-1.3.6-1.8Z" fill="currentColor"/></svg>
      </span>
      <span>WhatsApp concierge</span>
    </a>
  );
}
