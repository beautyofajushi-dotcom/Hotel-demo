'use client';

import { useEffect, useState } from 'react';
import { useBooking } from '@/components/BookingProvider';

function localDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function plusDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export default function BookingBar() {
  const { openBooking } = useBooking();
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState('2');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(localDate(new Date()));
    setArrival(localDate(plusDays(1)));
    setDeparture(localDate(plusDays(3)));
  }, []);

  const ask = (event) => {
    event.preventDefault();
    if (!arrival || !departure || departure <= arrival) return;
    openBooking({ arrival, departure, guests });
  };

  return (
    <form className="booking-bar" onSubmit={ask} aria-label="Check stay dates">
      <div className="booking-brand"><span className="booking-seal">M</span><span><strong>Find your stay</strong><small>Make room for the moment</small></span></div>
      <label className="booking-field"><span>ARRIVAL</span><input aria-label="Arrival date" type="date" min={today || undefined} value={arrival} onChange={(event) => { setArrival(event.target.value); if (departure <= event.target.value) setDeparture(''); }} required /></label>
      <label className="booking-field"><span>DEPARTURE</span><input aria-label="Departure date" type="date" min={arrival || today || undefined} value={departure} onChange={(event) => setDeparture(event.target.value)} required /></label>
      <label className="booking-field"><span>GUESTS</span><select aria-label="Number of guests" value={guests} onChange={(event) => setGuests(event.target.value)}><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option></select></label>
      <button className="button-gold" type="submit">Check availability <span className="button-arrow">↗</span></button>
    </form>
  );
}
