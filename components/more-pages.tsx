'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, MoveUpRight, Phone, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PageHero } from './inside-pages';
import { useExperience } from './experience-context';
import { DialogPortal } from './dialog-portal';
import { useEnquirySubmission } from './use-enquiry-submission';
import { SITE_CONTACT_EMAIL, SITE_CONTACT_PHONE, SITE_EMAIL_LINK, SITE_MAPS_URL, SITE_MAPS_URL_IS_CONFIGURED, SITE_PROPERTY_ADDRESS, SITE_PROPERTY_ADDRESS_IS_CONFIGURED, SITE_REGION, SITE_WHATSAPP_URL } from '@/lib/site-config';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const photographs = [
  { src: '/images/kumaon-retreat.webp', title: 'Illustrative resort concept', note: 'Concept image · not a verified property photograph' },
  { src: '/images/ayurveda-ritual.webp', title: 'Illustrative clinic space', note: 'Concept image · not a verified clinic photograph' },
  { src: '/images/himalayan-pool.webp', title: 'Illustrative pool scene', note: 'Concept image · facility availability is not verified' },
  { src: '/images/kumaoni-table.webp', title: 'Illustrative Kumaoni meal', note: 'Concept image · not a current menu' },
];

export function StayPage() {
  const root = useRef<HTMLElement>(null);
  const { openBooking } = useExperience();
  usePageMotion(root);

  return (
    <main id="main-content" ref={root} className="more-page stay-page">
      <PageHero
        label="HIMALAYAN HOTEL RESORT · DETAILS TO CONFIRM"
        title={<>Sleep closer<br /><em>to the quiet.</em></>}
        description="A hotel-resort concept for Kumaon. Confirm the operating location, room types, facilities, rates and stay policies before planning a visit."
        note="KUMAON REGION · EXACT LOCATION TO CONFIRM"
        image="/images/kumaon-retreat.webp"
      />
      <section id="main-next" className="stay-feature section-pad">
        <div className="stay-feature-photo" data-reveal>
          <Image src="/images/kumaon-retreat.webp" alt="Illustrative Himalayan hotel-resort concept image, not a verified property photograph" fill sizes="(max-width: 760px) 100vw, 55vw" />
          <span className="photo-caption">ILLUSTRATIVE CONCEPT IMAGE · NOT A PROPERTY PHOTOGRAPH</span>
        </div>
        <div className="stay-feature-copy" data-reveal>
          <span className="eyebrow"><span className="eyebrow-line" />ROOM & STAY INFORMATION</span>
          <h2>Details, confirmed<br /><em>before you travel.</em></h2>
          <p>The imagery and room details in this preview are illustrative, not a verified inventory. Ask the operator for current room types, capacity, amenities, access requirements and property photographs.</p>
          <div className="stay-amenities"><span>ROOM TYPES TO CONFIRM</span><span>ACCESSIBILITY TO ASK</span><span>AVAILABILITY TO ASK</span></div>
          <p className="stay-availability-note">Confirm rates, inclusions, exact directions, arrival options and cancellation terms in writing. An enquiry does not reserve a room.</p>
          <button className="button button-primary" onClick={() => openBooking({ mode: 'resort', interest: 'hotel-stay', source: 'stay-feature' })}>Ask about a stay <ArrowUpRight size={15} /></button>
        </div>
      </section>
      <section className="stay-details section-pad">
        <div className="eyebrow"><span className="eyebrow-line" />QUESTIONS TO ASK BEFORE A STAY</div>
        <div className="stay-detail-grid">
          <article data-reveal><span>01 / ROOMS</span><h3>Confirm room details</h3><p>Ask about room types, capacity, in-room amenities, access needs and which photographs show the actual property.</p></article>
          <article data-reveal><span>02 / LOCATION</span><h3>Confirm the route</h3><p>Request the exact address, current map pin, road conditions, transfer options and arrival instructions before setting out.</p></article>
          <article data-reveal><span>03 / TERMS</span><h3>Understand the booking</h3><p>Confirm current rates, taxes, inclusions, availability, payment method, cancellation rules and any extra fees in writing.</p></article>
        </div>
        <a href="/gallery" className="text-link">See illustrative concept images <ArrowUpRight size={15} /></a>
      </section>
      <section className="inside-cta section-pad">
        <span className="eyebrow"><span className="eyebrow-line" />YOUR PLACE IN KUMAON</span>
        <h2>Leave a little<br /><em>room for yourself.</em></h2>
        <button className="button button-primary" onClick={() => openBooking({ mode: 'resort', interest: 'hotel-stay', source: 'stay-closing' })}>Enquire about dates <ArrowUpRight size={16} /></button>
      </section>
    </main>
  );
}

export function DiningPage() {
  const root = useRef<HTMLElement>(null);
  const { openBooking } = useExperience();
  usePageMotion(root);

  return (
    <main id="main-content" ref={root} className="more-page dining-page">
      <PageHero
        label="A TABLE ROOTED IN PLACE"
        title={<>Good food.<br /><em>Good ground.</em></>}
        description="Ask about any current dining service. Dish names and images shown here are illustrative examples, not a live menu or sourcing claim."
        note="SAMPLE DISHES · NOT A LIVE MENU"
        image="/images/kumaoni-table.webp"
      />
      <section id="main-next" className="dining-feature section-pad">
        <div className="dining-copy" data-reveal>
          <span className="eyebrow"><span className="eyebrow-line" />FROM THE PAHADI PANTRY</span>
          <h2>A sense of place,<br /><em>served slowly.</em></h2>
          <p>Kumaoni cooking is one possible inspiration for this concept page. Dishes such as bhatt ki churkani, mandua roti, red rice and seasonal greens are examples only; they are not a claim about the operator&apos;s ingredients, suppliers or current menu.</p>
          <p>Before ordering, ask for the actual menu, prices, ingredient and allergen information, dietary accommodations and food-safety details.</p>
          <button className="button button-primary" onClick={() => openBooking({ mode: 'resort', interest: 'dining', source: 'dining-feature' })}>Ask about dining <ArrowUpRight size={15} /></button>
        </div>
        <div className="dining-photo" data-reveal>
          <Image src="/images/kumaoni-table.webp" alt="Illustrative Kumaoni meal concept image, not a current menu" fill sizes="(max-width: 760px) 100vw, 48vw" />
          <span className="photo-caption">ILLUSTRATIVE DISH · NOT A CURRENT MENU</span>
        </div>
      </section>
      <section className="menu-notes section-pad">
        <span className="eyebrow"><span className="eyebrow-line" />ILLUSTRATIVE DISH IDEAS · NOT A MENU</span>
        <div className="menu-notes-list">
          <div><span>GRAINS</span><b>Mandua roti · red rice</b><span>01</span></div>
          <div><span>FROM THE KITCHEN</span><b>Bhatt ki churkani · seasonal saag</b><span>02</span></div>
          <div><span>TO FINISH</span><b>Local fruit · tulsi chai</b><span>03</span></div>
        </div>
        <p className="menu-seasonal-note">These sample dishes do not indicate what is currently served or where ingredients are sourced.</p>
        <p className="experience-footnote">Ask the operator for the current menu, prices, ingredients, allergens, dietary options and food-safety information before ordering.</p>
      </section>
      <section className="inside-cta section-pad">
        <span className="eyebrow"><span className="eyebrow-line" />GATHER AROUND THE TABLE</span>
        <h2>Curious about<br /><em>dining options?</em></h2>
        <button className="button button-primary" onClick={() => openBooking({ mode: 'resort', interest: 'dining', source: 'dining-closing' })}>Ask about dining <ArrowUpRight size={16} /></button>
      </section>
    </main>
  );
}

export function ExperiencesPage() {
  const root = useRef<HTMLElement>(null);
  const { openBooking } = useExperience();
  usePageMotion(root);
  const cards = [
    { title: 'Outdoor options', tag: 'AVAILABILITY TO CONFIRM', body: 'Ask whether any nearby routes or guided activities are currently available. Confirm season, transport, route difficulty, guide details and accessibility.', image: '/images/kumaon-retreat.webp' },
    { title: 'Movement sessions', tag: 'PROVIDER & SCHEDULE TO CONFIRM', body: 'Ask whether instructor-led sessions are offered, who leads them, their qualifications, schedule, fees and any participation requirements.', image: '/images/ayurveda-ritual.webp' },
    { title: 'Facilities & downtime', tag: 'FACILITIES TO CONFIRM', body: 'Ask which facilities or services are currently available, their opening times, access requirements, age restrictions and any extra fees.', image: '/images/himalayan-pool.webp' },
  ];

  return (
    <main id="main-content" ref={root} className="more-page experiences-page">
      <PageHero
        label="SMALL WAYS TO FEEL MORE HERE"
        title={<>Follow what<br /><em>feels like you.</em></>}
        description="Ask about any current resort activities, schedules, providers, facilities and access. Nothing shown here is a confirmed programme."
        note="EXPERIENCES · AVAILABILITY TO CONFIRM"
        image="/images/himalayan-pool.webp"
      />
      <section id="main-next" className="experience-list section-pad">
        <div className="section-heading">
          <div><span className="eyebrow"><span className="eyebrow-line" />THE LANDSCAPE SETS THE PACE</span><h2>There is more<br /><em>than one way.</em></h2></div>
          <p className="care-heading-copy">Ask the operator which activities are actually offered and whether they suit your timing, access needs and interests.</p>
        </div>
        <div className="experience-card-grid">
          {cards.map((card, index) => (
            <article className="experience-card" key={card.title} data-reveal>
              <div className="experience-card-photo"><Image src={card.image} alt="" fill sizes="(max-width: 760px) 92vw, 32vw" /></div>
              <div className="experience-card-copy"><span>{card.tag}</span><h3>{card.title}</h3><p>{card.body}</p><button className="text-link" onClick={() => openBooking({ mode: 'resort', interest: 'experiences', source: `experience-${index + 1}` })}>Ask the operator <ArrowUpRight size={15} /></button></div>
              <span className="experience-card-index">0{index + 1}</span>
            </article>
          ))}
        </div>
        <p className="experience-footnote">These are enquiry prompts, not a current activity schedule. Confirm availability, provider qualifications, safety, access, prices and seasonal conditions directly before planning.</p>
      </section>
      <section className="local-note section-pad">
        <span className="eyebrow"><span className="eyebrow-line" />A GOOD NEIGHBOUR</span>
        <p>Any references to local guides, food sourcing, crafts or community partners must be verified with the operator. Ask who is involved, what is available and how access or fees work before making plans.</p>
        <a href="/dining" className="text-link">Ask about dining options <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}

export function GalleryPage() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  usePageMotion(root);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active === null) return;
    const changeImage = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setActive((current) => current === null ? 0 : (current + 1) % photographs.length);
      if (event.key === 'ArrowLeft') setActive((current) => current === null ? 0 : (current - 1 + photographs.length) % photographs.length);
    };
    window.addEventListener('keydown', changeImage);
    return () => window.removeEventListener('keydown', changeImage);
  }, [active]);

  return (
    <main id="main-content" ref={root} className="more-page gallery-page">
      <PageHero
        label="A LOOK INSIDE ARANYA"
        title={<>The house,<br /><em>in its own light.</em></>}
        description="Illustrative concept images for this preview—not verified photographs of an operating property, clinic or its facilities. Select an image to expand it."
        note="CONCEPT IMAGERY · NOT A VERIFIED PROPERTY GALLERY"
        image="/images/kumaon-retreat.webp"
      />
      <section id="main-next" className="gallery-section section-pad">
        <div className="gallery-heading"><span>01 — 04</span><span>ILLUSTRATIVE CONCEPT IMAGES</span><span>SELECT TO EXPAND</span></div>
        <div className="photo-gallery">
          {photographs.map((photo, index) => (
            <button className={`gallery-tile gallery-tile-${index + 1}`} key={photo.src} onClick={() => setActive(index)} aria-label={`View ${photo.title}`}>
              <span className="gallery-tile-photo"><Image src={photo.src} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></span>
              <span className="gallery-tile-index">0{index + 1} / 04</span>
              <span className="gallery-tile-caption"><span>{photo.note}</span><MoveUpRight size={17} /></span>
            </button>
          ))}
        </div>
      </section>
      <DialogPortal open={active !== null} onClose={() => setActive(null)} initialFocusRef={closeButtonRef}>
        {active !== null && (
          <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${photographs[active].title} photograph`} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
            <button ref={closeButtonRef} className="focus-dismiss" aria-label="Close gallery" onClick={() => setActive(null)}><X size={19} /></button>
            <button className="gallery-step gallery-step-prev" aria-label="Previous image" onClick={() => setActive((active - 1 + photographs.length) % photographs.length)}>‹</button>
            <div className="gallery-lightbox-photo"><Image src={photographs[active].src} alt={photographs[active].title} fill sizes="94vw" priority /></div>
            <div className="gallery-lightbox-caption"><span>{photographs[active].title}</span><span>{photographs[active].note}</span><span>{String(active + 1).padStart(2, '0')} / 04</span></div>
            <button className="gallery-step gallery-step-next" aria-label="Next image" onClick={() => setActive((active + 1) % photographs.length)}>›</button>
          </div>
        )}
      </DialogPortal>
    </main>
  );
}

export function ContactPage() {
  const root = useRef<HTMLElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const returnedFromSuccess = useRef(false);
  const { status, error, fallbackHref, submit, reset } = useEnquirySubmission();
  usePageMotion(root);

  useEffect(() => {
    if (status === 'success') {
      successHeading.current?.focus();
      returnedFromSuccess.current = true;
    } else if (status === 'idle' && returnedFromSuccess.current) {
      returnedFromSuccess.current = false;
      firstField.current?.focus();
    }
  }, [status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => submit(event, 'contact');

  return (
    <main id="main-content" ref={root} className="more-page contact-page">
      <PageHero
        label="A GOOD PLACE TO BEGIN"
        title={<>We are here<br /><em>when you are.</em></>}
        description="Send a hotel-resort, wellness-clinic, dining or general enquiry. Current services, contact details and the exact operating location must be confirmed."
        note="KUMAON REGION · EXACT LOCATION TO CONFIRM"
        image="/images/kumaon-retreat.webp"
      />
      <section id="main-next" className="contact-section section-pad">
        <div className="contact-information" data-reveal>
          <span className="eyebrow"><span className="eyebrow-line" />CONTACT & ARRIVAL INFORMATION</span>
          <h2>Start with<br /><em>a clear question.</em></h2>
          <p>This preview identifies Kumaon as a region only. Request a verified address, map pin and arrival instructions before travelling.</p>
          <div className="contact-detail"><MapPin size={16} /><span>{SITE_PROPERTY_ADDRESS || `${SITE_REGION} · approximate region only`}<br />India · IST (UTC+5:30)</span></div>
          <a className="contact-detail contact-map" href={SITE_MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={16} /><span>{SITE_MAPS_URL_IS_CONFIGURED ? 'Open the configured map link · verify the pin' : 'Open the approximate Kumaon region in Google Maps'} <ArrowUpRight size={13} /></span></a>
          {(!SITE_PROPERTY_ADDRESS_IS_CONFIGURED || !SITE_MAPS_URL_IS_CONFIGURED) && <p className="contact-location-note">At least one location detail is not configured. Do not use the regional locator as a property entrance; confirm the exact address, map pin and route with the operator before setting out.</p>}
          {SITE_CONTACT_EMAIL
            ? <a className="contact-detail" href={SITE_EMAIL_LINK}><Mail size={16} /><span>{SITE_CONTACT_EMAIL}<br />Email the operator</span></a>
            : <div className="contact-detail contact-unconfigured"><Mail size={16} /><span>Verified contact email is not configured in this preview.</span></div>}
          {SITE_CONTACT_PHONE && <a className="contact-detail" href={`tel:${SITE_CONTACT_PHONE.replace(/[^+\d]/g, '')}`}><Phone size={16} /><span>{SITE_CONTACT_PHONE}<br />Call the operator</span></a>}
          {SITE_WHATSAPP_URL && <a className="contact-detail" href={SITE_WHATSAPP_URL} target="_blank" rel="noreferrer"><Phone size={16} /><span>Message via configured WhatsApp <ArrowUpRight size={13} /></span></a>}
          <a className="text-link contact-gallery-link" href="/gallery">See illustrative concept images <ArrowUpRight size={15} /></a>
        </div>
        <div className="contact-form-wrap" data-reveal>
          {status === 'success' ? (
            <div className="contact-success" aria-live="polite"><span><Check size={20} /></span><h3 ref={successHeading} tabIndex={-1}>Enquiry sent.</h3><p>Your message was accepted for email delivery to the configured recipient. This does not confirm a booking or clinic appointment; the operator must reply with next steps.</p><button className="text-link" type="button" onClick={reset}>Send another note <ArrowRight size={14} /></button></div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
              <span className="eyebrow"><span className="eyebrow-line" />SEND A NOTE</span>
              <input type="hidden" name="source" value="contact-page" />
              <label>Your name<input ref={firstField} name="name" autoComplete="name" placeholder="How should we address you?" required maxLength={100} /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
              <label>Phone number <span className="field-optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="Include country code if outside India" maxLength={40} /></label>
              <label>What brings you to us?
                <select name="interest" defaultValue="" required>
                  <option value="" disabled>Select an enquiry</option>
                  <option value="stay">A stay in Kumaon</option>
                  <option value="clinic">Wellness clinic enquiry</option>
                  <option value="dining">Dining</option>
                  <option value="experiences">Experiences</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label>Your message<textarea name="message" rows={4} placeholder="A brief note about what you have in mind. Please do not include medical records or sensitive health details." required maxLength={2000} /></label>
              <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
              {error && <p className="form-error" role="alert">{error} {fallbackHref && <><a href={fallbackHref}>Open an email with these details</a>.</>}</p>}
              <button className="button button-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send your enquiry'} <ArrowUpRight size={15} /></button>
              <span className="contact-form-note">Your details are used to answer this enquiry. <a href="/privacy">Read the privacy notice</a>.</span>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function usePageMotion(root: React.RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  useGSAP(() => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.page-hero-content > *', { y: 25, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out', delay: 0.1,
    });
    gsap.utils.toArray<HTMLElement>('.more-page [data-reveal], .gallery-tile').forEach((element) => {
      gsap.fromTo(element, { y: 26, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      });
    });
  }, { scope: root, dependencies: [prefersReducedMotion], revertOnUpdate: true });
}
