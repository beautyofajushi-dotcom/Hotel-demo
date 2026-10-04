'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useDialogAccessibility from '@/components/useDialogAccessibility';

const BookingContext = createContext(null);
const HOTEL_WHATSAPP = process.env.NEXT_PUBLIC_HOTEL_WHATSAPP || '';
const requestOptions = [
  'Any room / stay',
  'Taj View Suite',
  'Mughal Heritage Room',
  'Garden Premier Room',
  'Family Residence',
  'Wedding enquiry',
  'Dining enquiry',
  'Agra city experience',
];

function toISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function defaultForm(preset = {}) {
  const today = new Date();
  const arrival = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const departure = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
  return {
    name: '',
    contact: '',
    arrival: preset.arrival || toISO(arrival),
    departure: preset.departure || toISO(departure),
    guests: String(preset.guests || 2),
    request: requestOptions.includes(preset.request) ? preset.request : 'Any room / stay',
    whatsapp: false,
  };
}
function waUrl(message) {
  const number = HOTEL_WHATSAPP.replace(/\D/g, '');
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
}
function prettyDate(value) {
  if (!value) return 'dates to be confirmed';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(() => defaultForm());
  const [success, setSuccess] = useState(false);
  const [whatsAppHref, setWhatsAppHref] = useState('https://wa.me/');

  const openBooking = (preset = {}) => {
    setForm(defaultForm(preset));
    setSuccess(false);
    setIsOpen(true);
  };
  const closeBooking = () => setIsOpen(false);
  const update = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === 'departure') event.target.setCustomValidity('');
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const dialogRef = useDialogAccessibility(isOpen, closeBooking, 'input[name="name"]');
  const successTitleRef = useRef(null);
  useEffect(() => {
    if (!success || !isOpen) return undefined;
    const frame = window.requestAnimationFrame(() => successTitleRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [success, isOpen]);

  const submit = (event) => {
    event.preventDefault();
    if (form.departure <= form.arrival) {
      const departureInput = event.currentTarget.elements.namedItem('departure');
      departureInput.setCustomValidity('Departure must be after arrival.');
      departureInput.reportValidity();
      return;
    }
    const request = { ...form, createdAt: new Date().toISOString() };
    try {
      const previous = JSON.parse(window.localStorage.getItem('miraan-demo-enquiries') || '[]');
      window.localStorage.setItem('miraan-demo-enquiries', JSON.stringify([...previous, request].slice(-20)));
    } catch (_error) {
      // This is a prototype; the request remains visible in the success view even if storage is unavailable.
    }
    setWhatsAppHref(waUrl(`Hello Mirāan Agra, I would like to enquire about a stay.\nName: ${form.name}\nDates: ${prettyDate(form.arrival)} to ${prettyDate(form.departure)}\nGuests: ${form.guests}\nRequest: ${form.request}.`));
    setSuccess(true);
  };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      {isOpen && (
        <div className="booking-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeBooking(); }}>
          <section className="booking-dialog" ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="booking-title" aria-describedby={success ? 'booking-success-description' : 'booking-dialog-intro'} data-lenis-prevent>
            <button className="dialog-close" type="button" aria-label="Close booking enquiry" onClick={closeBooking}>×</button>
            {!success ? (
              <>
                <p className="eyebrow">MIRĀAN AGRA · RESERVATIONS</p>
                <h2 id="booking-title">Make room for<br /><em>a little wonder.</em></h2>
                <p className="booking-dialog-intro" id="booking-dialog-intro">Tell us the shape of your stay. Our reservations team can help with dates, rooms and the details that make the trip yours.</p>
                <form className="booking-form" onSubmit={submit}>
                  <div className="booking-form-row">
                    <label>Your name<input name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Full name" required /></label>
                    <label>Email or mobile<input name="contact" value={form.contact} onChange={update} autoComplete="email" placeholder="How can we reach you?" required /></label>
                  </div>
                  <div className="booking-form-row">
                    <label>Arrival<input name="arrival" type="date" min={toISO(new Date())} value={form.arrival} onChange={update} required /></label>
                    <label>Departure<input name="departure" type="date" min={form.arrival} value={form.departure} onChange={update} required /></label>
                  </div>
                  <div className="booking-form-row">
                    <label>Guests<select name="guests" value={form.guests} onChange={update}><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="7">7+ guests</option></select></label>
                    <label>I'm enquiring about<select name="request" value={form.request} onChange={update}>{requestOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                  </div>
                  <label className="consent-row"><input name="whatsapp" type="checkbox" checked={form.whatsapp} onChange={update} />I’m happy to receive a follow-up on WhatsApp</label>
                  <button className="button-gold" type="submit">Request availability <span className="button-arrow">↗</span></button>
                  <p className="booking-note">Demo flow: this request is saved only in this browser. No payment is collected.</p>
                  <div className="payment-placeholder"><span>FUTURE SECURE CHECKOUT</span><div><b>Razorpay</b><i>UPI</i><i>NetBanking</i></div><small>Provider integration placeholder · checkout activates only after a secure booking backend is connected.</small></div>
                </form>
              </>
            ) : (
              <div className="booking-success">
                <span className="booking-success-mark" aria-hidden="true">✓</span>
                <p className="eyebrow">YOUR STAY, IN THE MAKING</p>
                <h2 id="booking-title" ref={successTitleRef} tabIndex={-1}>Enquiry noted.</h2>
                <p id="booking-success-description">{form.name}, your {form.request.toLowerCase()} enquiry for {form.guests} guest{form.guests === '1' ? '' : 's'} from {prettyDate(form.arrival)} to {prettyDate(form.departure)} is saved in this demo.</p>
                <p>Nothing has been sent to the hotel yet. Connect a booking backend before taking live reservations.</p>
                <div className="booking-success-actions"><a href={whatsAppHref} target="_blank" rel="noreferrer">{HOTEL_WHATSAPP ? 'Continue with Mirāan on WhatsApp ↗' : 'Continue in WhatsApp ↗'}</a><button className="text-link" type="button" onClick={closeBooking}>Back to the site <span>↗</span></button></div>
              </div>
            )}
          </section>
        </div>
      )}
    </BookingContext.Provider>
  );
}
