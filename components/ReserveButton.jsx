'use client';

import { useBooking } from '@/components/BookingProvider';

export default function ReserveButton({ request, guests, className = 'button-gold', children = 'Reserve now' }) {
  const { openBooking } = useBooking();
  const needsArrow = !className.split(/\s+/).includes('text-link');
  return <button className={className} type="button" onClick={() => openBooking({ request, guests })}>{children}{needsArrow && <span className="button-arrow">↗</span>}</button>;
}
