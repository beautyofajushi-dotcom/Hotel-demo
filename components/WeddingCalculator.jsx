'use client';

import { useEffect, useMemo, useState } from 'react';
import { useBooking } from '@/components/BookingProvider';

function localDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

const venues = [
  { name: 'Noor Courtyard', min: 80, max: 180, kind: 'COURTYARD', description: 'A private jali courtyard for pheras, mehendi and dinners under the evening sky.' },
  { name: 'Darbar Ballroom', min: 100, max: 280, kind: 'BALLROOM', description: 'A richly detailed indoor setting for sangeet, speeches and a grand reception.' },
  { name: 'Mehtab Garden Lawn', min: 200, max: 500, kind: 'LAWN', description: 'A generous open-air canvas with the Taj skyline as a beautiful distant backdrop.' },
];

export default function WeddingCalculator() {
  const [guests, setGuests] = useState(250);
  const [today, setToday] = useState('');
  const [status, setStatus] = useState('This demo saves the enquiry in this browser only; no message is sent.');
  const { openBooking } = useBooking();
  useEffect(() => setToday(localDate(new Date())), []);
  const suggested = useMemo(() => venues.filter((venue) => guests >= venue.min && guests <= venue.max).sort((a, b) => a.max - b.max)[0], [guests]);

  const submit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const record = { ...data, guests, createdAt: new Date().toISOString() };
    try {
      const items = JSON.parse(localStorage.getItem('miraan-wedding-enquiries') || '[]');
      localStorage.setItem('miraan-wedding-enquiries', JSON.stringify([...items, record].slice(-20)));
      setStatus(`Your ${guests >= 500 ? '500+' : guests}-guest celebration enquiry is saved in this browser preview.`);
    } catch (_error) {
      setStatus('Preview only: connect a hotel event inbox before accepting live enquiries.');
    }
  };

  return (
    <div className="capacity-panel" data-reveal>
      <div className="capacity-head"><div><p className="eyebrow">GUEST COUNT</p><p className="capacity-number">{guests >= 500 ? '500+' : guests}<small> guests</small></p></div><div><input className="capacity-range" type="range" min="100" max="500" step="10" value={guests} aria-label="Wedding guest count" onChange={(event) => setGuests(Number(event.target.value))} /><div className="range-labels"><span>100 guests</span><span>500+ guests</span></div></div></div>
      <div className="venue-grid">
        {venues.map((venue) => {
          const isFit = suggested?.name === venue.name;
          const text = isFit ? 'BEST FIT' : guests > venue.max ? 'MORE SPACE' : 'AN OPTION';
          return <article className={`venue-card ${isFit ? 'is-fit' : ''}`} key={venue.name}><div className="venue-card-label"><span>{venue.kind}</span><span>{text}</span></div><h3>{venue.name}</h3><p>{venue.description}</p><div className="venue-card-foot"><span>{venue.min}–{venue.max} guests</span><span>{isFit ? 'RECOMMENDED' : 'VIEW SETTING'}</span></div></article>;
        })}
      </div>
      <p className="capacity-recommendation" aria-live="polite">{suggested ? `A first fit for ${guests >= 500 ? '500+' : guests} guests: ${suggested.name}.` : `For ${guests} guests, our event team can combine spaces and design a custom floor plan.`} Final layouts depend on event style and service plan.</p>
      <form className="event-form mt-9 border-t border-ink/15 pt-7" onSubmit={submit}>
        <div className="event-form-row"><label>Your name<input name="name" placeholder="Full name" required /></label><label>Email or phone<input name="contact" placeholder="How can we reach you?" required /></label></div>
        <div className="event-form-row"><label>Celebration date<input name="date" type="date" min={today || undefined} required /></label><label>Occasion<select name="occasion"><option>Wedding celebration</option><option>Mehendi / sangeet</option><option>Family gathering</option><option>Private dinner</option></select></label></div>
        <div className="flex flex-wrap items-center gap-3"><button className="button-gold" type="submit">Save event enquiry <span className="button-arrow">↗</span></button><button className="button-outline !min-h-[48px] !border-ink/30 !text-ink hover:!text-ink" type="button" onClick={() => openBooking({ request: 'Wedding enquiry', guests })}>Plan a room block <span className="button-arrow">↗</span></button></div>
        <p className={`event-status ${status.startsWith('Your') ? 'is-success' : ''}`} aria-live="polite">{status}</p>
      </form>
    </div>
  );
}
