'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Check, Mail, Volume2, VolumeX, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useExperience } from './experience-context';
import { DialogPortal } from './dialog-portal';
import { useEnquirySubmission } from './use-enquiry-submission';
import { SITE_CONTACT_EMAIL, SITE_CONTACT_PHONE, SITE_EMAIL_LINK, SITE_PROPERTY_ADDRESS, SITE_REGION, SITE_WHATSAPP_URL } from '@/lib/site-config';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function SiteFooter() {
  const { mode, openBooking, playTick } = useExperience();
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-identity">
          <Link href="/" className="footer-brand" onClick={playTick}>ARANYA<span>HOTEL RESORT · WELLNESS CLINIC</span></Link>
          <p>Two distinct enquiry paths: hotel resort and wellness clinic. Confirm the operating location, facilities, services and provider details before planning a visit.</p>
          <span className="footer-location"><span className="status-dot" />APPROXIMATE REGION · {SITE_REGION.toUpperCase()}</span>
          {SITE_PROPERTY_ADDRESS && <p className="footer-address">{SITE_PROPERTY_ADDRESS}</p>}
        </div>
        <div className="footer-column">
          <span className="footer-heading">EXPLORE</span>
          <Link href="/stay" onClick={playTick}>Hotel resort</Link>
          <Link href="/spaces" onClick={playTick}>Spaces</Link>
          <Link href="/wellness" onClick={playTick}>Wellness clinic</Link>
          <Link href="/experiences" onClick={playTick}>Experiences</Link>
          <Link href="/dining" onClick={playTick}>Dining</Link>
          <Link href="/journal" onClick={playTick}>Journal preview</Link>
          <Link href="/gallery" onClick={playTick}>Illustrative gallery</Link>
          <Link href="/contact" onClick={playTick}>Visit & contact</Link>
        </div>
        <div className="footer-column">
          <span className="footer-heading">GET IN TOUCH</span>
          <button onClick={() => openBooking({ mode, source: 'footer' })}>Make an enquiry <ArrowUpRight size={13} /></button>
          {SITE_WHATSAPP_URL && <a href={SITE_WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a>}
          {SITE_CONTACT_EMAIL
            ? <a href={SITE_EMAIL_LINK}>Email {SITE_CONTACT_EMAIL}</a>
            : <span className="footer-unconfigured">Verified email not configured</span>}
          {SITE_CONTACT_PHONE && <a href={`tel:${SITE_CONTACT_PHONE.replace(/[^+\d]/g, '')}`}>{SITE_CONTACT_PHONE}</a>}
          <Link href="/privacy">Privacy & enquiries</Link>
        </div>
        <div className="footer-signoff"><span>Kumaon</span><span>Uttarakhand</span><i /></div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ARANYA HIMALAYAN HOUSE</span>
        <span>ILLUSTRATIVE PREVIEW · DETAILS TO BE VERIFIED</span>
        <div><a href="#top">BACK TO TOP ↑</a><span>INDIA STANDARD TIME · UTC+5:30</span></div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const { soundEnabled, toggleSound, playTick } = useExperience();
  const contactAction = SITE_WHATSAPP_URL || SITE_EMAIL_LINK;
  return (
    <div className="floating-actions">
      <button className={`sound-toggle ${soundEnabled ? 'sound-on' : ''}`} onClick={() => { toggleSound(); playTick(); }} aria-label={soundEnabled ? 'Turn interface sound off' : 'Turn interface sound on'} aria-pressed={soundEnabled}>
        {soundEnabled ? <Volume2 size={15} strokeWidth={1.4} /> : <VolumeX size={15} strokeWidth={1.4} />}
        <span>SOUND {soundEnabled ? 'ON' : 'OFF'}</span>
      </button>
      {contactAction && (
        <a
          className="whatsapp-action"
          href={contactAction}
          target={SITE_WHATSAPP_URL ? '_blank' : undefined}
          rel={SITE_WHATSAPP_URL ? 'noreferrer' : undefined}
          aria-label={SITE_WHATSAPP_URL ? 'Message Aranya on WhatsApp' : `Email Aranya at ${SITE_CONTACT_EMAIL}`}
        >
          {SITE_WHATSAPP_URL ? <WhatsAppMark /> : <Mail size={21} />}
          <span className="whatsapp-tooltip">{SITE_WHATSAPP_URL ? 'WhatsApp' : 'Email Aranya'}</span>
        </a>
      )}
    </div>
  );
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.1 11.7a8.1 8.1 0 0 1-12 7.1L4 20l1.2-4a8.1 8.1 0 1 1 14.9-4.3Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.2.6l-.5.6c-.1.2-.2.3 0 .6.4.8 1.2 1.6 2 2 .3.2.5.2.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.3.6-.1.7-.5 1.3-1.1 1.6-.5.3-1.2.5-2.3.1-1-.3-2.4-1-3.9-2.5-1.3-1.3-2-2.7-2.2-3.8-.2-1 .1-1.7.5-2.2.3-.4.7-.6 1.1-.7Z" fill="currentColor" />
    </svg>
  );
}

export function BookingModal() {
  const { bookingOpen, bookingIntent, closeBooking, mode } = useExperience();
  const [submitted, setSubmitted] = useState(false);
  const [preferredContact, setPreferredContact] = useState('email');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const firstField = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const { status, error, fallbackHref, submit, reset } = useEnquirySubmission();
  const enquiryMode = bookingIntent?.mode ?? mode;
  const isClinic = enquiryMode === 'clinic';
  const source = bookingIntent?.source || 'header';
  const today = indiaDateValue();

  useEffect(() => {
    setSubmitted(false);
    setPreferredContact('email');
    setCheckInDate('');
    setCheckOutDate('');
    reset();
  }, [bookingOpen, reset]);

  useEffect(() => {
    if (submitted) successHeading.current?.focus();
  }, [submitted]);

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    if (await submit(event, 'booking', { mode: enquiryMode })) setSubmitted(true);
  };

  if (!bookingOpen) return null;

  return (
    <DialogPortal open={bookingOpen} onClose={closeBooking} initialFocusRef={submitted ? successHeading : firstField}>
      <div className="booking-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeBooking(); }}>
        <section className="booking-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title" aria-busy={status === 'sending'}>
          <button className="booking-close" type="button" onClick={closeBooking} aria-label="Close booking enquiry"><X size={19} /></button>
          <span className="eyebrow"><span className="eyebrow-line" />{isClinic ? 'A PRIVATE CONVERSATION' : 'YOUR TIME, WELL SPENT'}</span>
          {submitted ? (
            <div className="booking-success" aria-live="polite">
              <span className="booking-success-mark"><Check size={22} /></span>
              <h2 id="booking-title" ref={successHeading} tabIndex={-1}>A good beginning.</h2>
              <p>Your enquiry was accepted for email delivery to the configured recipient. This is not a confirmed reservation or clinic appointment; the operator must reply with next steps.</p>
              <button className="button button-primary" type="button" onClick={closeBooking}>Close <ArrowUpRight size={15} /></button>
            </div>
          ) : (
            <>
              <h2 id="booking-title">{isClinic ? <>Let&apos;s start<br /><em>with a conversation.</em></> : <>Make room<br /><em>for something good.</em></>}</h2>
              <p className="booking-intro">{isClinic ? 'Share a few practical details. Please do not include medical records or sensitive health information here.' : 'Tell us when you hope to visit. The operator must confirm current availability, rates and arrival details; this enquiry is not a confirmed booking.'}</p>
              <form onSubmit={submitBooking} className="booking-form" aria-describedby="booking-privacy">
                <input type="hidden" name="mode" value={enquiryMode} />
                <input type="hidden" name="source" value={source} />
                <label>Your name<input ref={firstField} name="name" placeholder="First and last name" required autoComplete="name" maxLength={100} /></label>
                <label>Email address<input name="email" type="email" placeholder="you@example.com" required autoComplete="email" maxLength={254} /></label>
                <label>Phone number <span className="field-optional">{isClinic && preferredContact === 'phone' ? '(required)' : '(optional)'}</span><input name="phone" type="tel" placeholder="Include country code if outside India" autoComplete="tel" maxLength={40} required={isClinic && preferredContact === 'phone'} /></label>
                <label>{isClinic ? 'What would you like to discuss?' : 'Room or experience preference'}
                  <select name="interest" required defaultValue={bookingIntent?.interest || ''} key={`${enquiryMode}-${bookingIntent?.interest || ''}`}>
                    <option value="" disabled>Select one</option>
                    {isClinic ? <><option value="services">Service information</option><option value="providers">Provider qualifications</option><option value="fees">Fees and appointments</option><option value="general">General clinic enquiry</option></> : <><option value="hotel-stay">Hotel stay</option><option value="facilities">Facilities and access</option><option value="dining">Dining</option><option value="experiences">Experiences</option><option value="general">General resort enquiry</option></>}
                  </select>
                </label>
                {isClinic ? (
                  <label>Preferred contact method
                    <select name="preferredContact" value={preferredContact} onChange={(event) => setPreferredContact(event.target.value)}><option value="email">Email</option><option value="phone">Phone</option></select>
                  </label>
                ) : (
                  <>
                    <div className="booking-form-row booking-date-row">
                      <label>Arrival<input name="checkIn" type="date" min={today} value={checkInDate} onChange={(event) => { const nextDate = event.target.value; setCheckInDate(nextDate); if (checkOutDate && checkOutDate <= nextDate) setCheckOutDate(''); }} required /></label>
                      <label>Departure<input name="checkOut" type="date" min={checkInDate || today} value={checkOutDate} onChange={(event) => setCheckOutDate(event.target.value)} required /></label>
                    </div>
                    <label>Guests<input name="guests" type="number" min="1" step="1" defaultValue="2" required /></label>
                  </>
                )}
                {isClinic && <label>Anything else? <span className="field-optional">(optional; no medical details)</span><textarea name="message" rows={3} maxLength={500} placeholder="A brief, general note only." /></label>}
                <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
                {error && <p className="form-error" role="alert">{error} {fallbackHref && <><a href={fallbackHref}>Open an email with these details</a>.</>}</p>}
                <button className="button button-primary booking-submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send an enquiry'} <ArrowUpRight size={15} />
                </button>
                <span id="booking-privacy" className="booking-privacy">Your details are used to reply to this enquiry. <Link href="/privacy">Read the privacy notice</Link>.</span>
              </form>
            </>
          )}
        </section>
      </div>
    </DialogPortal>
  );
}

function indiaDateValue() {
  const dateParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const part = (type: string) => dateParts.find((item) => item.type === type)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    const onScroll = () => ScrollTrigger.update();
    const onFrame = (time: number) => lenis?.raf(time * 1000);

    const enable = () => {
      if (lenis || reducedMotion.matches) return;
      lenis = new Lenis({
        duration: 1.18,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      });
      lenis.on('scroll', onScroll);
      gsap.ticker.add(onFrame);
      gsap.ticker.lagSmoothing(0);
    };
    const disable = () => {
      if (!lenis) return;
      gsap.ticker.remove(onFrame);
      lenis.destroy();
      lenis = null;
    };
    const onMotionChange = () => reducedMotion.matches ? disable() : enable();

    enable();
    reducedMotion.addEventListener('change', onMotionChange);
    return () => {
      reducedMotion.removeEventListener('change', onMotionChange);
      disable();
    };
  }, []);
  return null;
}

export function RouteLoader() {
  const pathname = usePathname();
  const loaderRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || prefersReducedMotion) return;
    const timeline = gsap.timeline();
    timeline.set(loader, { transformOrigin: 'left center', scaleX: 0, autoAlpha: 1 });
    timeline.to(loader, { scaleX: 1, duration: 0.18, ease: 'power2.out' });
    timeline.to(loader, { autoAlpha: 0, duration: 0.16, delay: 0.04 });
    return () => { timeline.kill(); };
  }, [pathname, prefersReducedMotion]);

  return <div className="route-loader" ref={loaderRef} aria-hidden="true"><i /></div>;
}
