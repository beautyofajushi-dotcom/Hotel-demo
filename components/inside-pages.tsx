'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SpacesGallery } from './spaces-gallery';
import { useExperience } from './experience-context';
import { DialogPortal } from './dialog-portal';
import { useEnquirySubmission } from './use-enquiry-submission';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SpacesPage() {
  const root = useRef<HTMLDivElement>(null);
  const { mode, openBooking } = useExperience();
  usePageReveal(root, mode);
  const clinic = mode === 'clinic';

  return (
    <main id="main-content" ref={root} className="inside-page spaces-page">
      <PageHero
        label={clinic ? 'A MORE CONSIDERED KIND OF CARE' : 'THE HIMALAYAN HOTEL RESORT'}
        title={clinic ? <>Space to begin<br /><em>again.</em></> : <>A world of<br /><em>your own.</em></>}
        description={clinic
          ? 'A separate clinic-enquiry path. Confirm services, provider qualifications, scope, fees and appointment options directly.'
          : 'A hotel-resort enquiry page for Kumaon. Confirm room types, facilities, access, rates and stay terms directly.'}
        note={clinic ? 'WELLNESS CLINIC · DETAILS TO CONFIRM' : 'HOTEL RESORT · DETAILS TO CONFIRM'}
        image={clinic ? '/images/ayurveda-ritual.webp' : '/images/kumaon-retreat.webp'}
      />
      <section id="main-next" className="inside-intro section-pad">
        <div className="inside-intro-index">ARANYA<br />{clinic ? 'CARE' : 'SPACES'}<br /><span>01 / 03</span></div>
        <p>{clinic
          ? <>Ask what services are offered, who provides them and what qualifications and scope apply. An enquiry does not establish <em>clinical suitability</em> or confirm an appointment.</>
          : <>Ask the operator to confirm room types, facilities, rates, accessibility, exact location and stay terms before you <em>plan a visit.</em></>}</p>
        <a href="#our-spaces" className="intro-scroll">DISCOVER THE SPACES <ArrowDown size={14} /></a>
      </section>
      <section id="our-spaces" className="spaces-section section-pad inside-gallery-section">
        <div className="section-heading">
          <div><span className="eyebrow"><span className="eyebrow-line" />{clinic ? 'CLINIC DETAILS TO CONFIRM' : 'ROOMS & FACILITIES TO CONFIRM'}</span><h2>{clinic ? <>Know before<br /><em>you enquire.</em></> : <>Details to request<br /><em>before your stay.</em></>}</h2></div>
          <div className="section-heading-side"><p>{clinic ? 'Request current service information and provider details before considering an appointment.' : 'These are illustrative concept images. Ask which pictured spaces and facilities are actually available.'}</p><span className="small-coordinate">KUMAON HIMALAYA<br />UTTARAKHAND · INDIA</span></div>
        </div>
        <p className="preview-disclosure">All images are illustrative. Facility, service, access and availability details require direct confirmation.</p>
        <SpacesGallery />
      </section>
      <section className="inside-cta section-pad">
        <span className="eyebrow"><span className="eyebrow-line" />THE FIRST STEP IS A CONVERSATION</span>
        <h2>{clinic ? <>We would be glad<br /><em>to hear from you.</em></> : <>A little time away<br /><em>can change a lot.</em></>}</h2>
        <button className="button button-primary" onClick={() => openBooking({ mode, interest: clinic ? 'general' : 'hotel-stay', source: 'spaces-closing' })}>{clinic ? 'Make an enquiry' : 'Ask about dates'} <ArrowUpRight size={16} /></button>
      </section>
    </main>
  );
}

export function WellnessPage() {
  const root = useRef<HTMLDivElement>(null);
  const { mode, openBooking } = useExperience();
  usePageReveal(root, mode);

  return (
    <main id="main-content" ref={root} className="inside-page wellness-page">
      <PageHero
        label="WELLNESS CLINIC ENQUIRIES"
        title={<>Care, with<br /><em>clarity.</em></>}
        description="A clinic enquiry is presented separately from a hotel-resort enquiry. Ask the operator to confirm current services, practitioners, qualifications, scope and fees."
        note="WELLNESS CLINIC · ENQUIRY ONLY"
        treatment
        image="/images/ayurveda-ritual.webp"
      />
      <section id="main-next" className="wellness-manifesto section-pad">
        <div className="wellness-manifesto-symbol" aria-hidden="true"><span>A</span><i /><i /><i /></div>
        <div className="wellness-manifesto-copy">
          <span className="eyebrow"><span className="eyebrow-line" />BEFORE MAKING A CLINIC ENQUIRY</span>
          <h2>Start with<br /><em>clear questions.</em></h2>
          <p>This preview does not verify the clinic&apos;s service list, staff, qualifications, registration, facilities or outcomes. Request current written information and decide with a qualified professional whether any service is right for you.</p>
          <button className="button button-primary" onClick={() => openBooking({ mode: 'clinic', interest: 'general', source: 'wellness-care-team' })}>Ask about services & providers <ArrowUpRight size={15} /></button>
        </div>
      </section>
      <section className="care-section section-pad">
        <div className="section-heading">
          <div><span className="eyebrow"><span className="eyebrow-line" />INFORMATION TO REQUEST</span><h2>Know the details<br /><em>before you decide.</em></h2></div>
          <p className="care-heading-copy">An enquiry is not clinical advice, a diagnosis, a treatment recommendation or a confirmed appointment.</p>
        </div>
        <div className="care-list">
          {[
            { no: '01', title: 'Services', desc: 'Request the current service list, intended purpose, who may be eligible and what the service does not cover.' },
            { no: '02', title: 'Providers', desc: 'Ask for the practitioner’s full name, qualifications, registration where applicable, scope of practice and clinical oversight.' },
            { no: '03', title: 'Practicalities', desc: 'Confirm fees, risks, alternatives, appointment availability, accessibility, privacy practices and cancellation terms.' },
          ].map((item) => (
            <article className="care-row" key={item.no}>
              <span className="care-number">{item.no}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="care-row-icon"><ArrowUpRight size={16} /></span>
            </article>
          ))}
        </div>
      </section>
      <section className="clinic-safety-note section-pad" aria-label="Clinic enquiry information">
        <strong>Health and safety</strong>
        <p>No provider credentials, clinical scope, facilities or health outcomes have been verified for this preview. Please do not send medical records or detailed health information through these forms. This website is not an emergency-care service; for urgent needs, contact local emergency services or a qualified local healthcare provider.</p>
      </section>
      <section className="inside-cta section-pad">
        <span className="eyebrow"><span className="eyebrow-line" />A GOOD PLACE TO BEGIN</span>
        <h2>Tell us what<br /><em>you are looking for.</em></h2>
        <button className="button button-primary" onClick={() => openBooking({ mode: 'clinic', interest: 'general', source: 'wellness-closing' })}>Start a conversation <ArrowUpRight size={16} /></button>
      </section>
    </main>
  );
}

function journalImage(art: string) {
  if (art === 'table') return '/images/kumaoni-table.webp';
  if (art === 'rest') return '/images/ayurveda-ritual.webp';
  if (art === 'landscape') return '/images/himalayan-pool.webp';
  return '/images/kumaon-retreat.webp';
}

const journalStories = [
  {
    category: 'EDITORIAL SAMPLE · DRAFT', title: 'The quiet science of a slower morning',
    dek: 'Sample editorial heading. Replace with an approved, fact-checked article before publication.',
    art: 'morning',
    body: 'This is placeholder copy for layout review, not a report about the operating property, its staff or a guest experience. Replace it with an approved story and check any health or wellbeing claims with an appropriately qualified reviewer.'
  },
  {
    category: 'EDITORIAL SAMPLE · DRAFT', title: 'Learning to listen to the landscape',
    dek: 'A possible theme for a future, verified regional feature.',
    art: 'landscape',
    body: 'This is placeholder copy, not a description of a verified route, local partner or activity. Before publication, confirm locations, access, safety, seasonality, transport and any permissions with the relevant people.'
  },
  {
    category: 'EDITORIAL SAMPLE · DRAFT', title: 'A table set by the seasons',
    dek: 'A possible theme for a future food and place story.',
    art: 'table',
    body: 'This is placeholder copy, not a description of an operating kitchen, current menu, supplier or food-safety practice. Verify any dish, ingredient, sourcing or dietary statement with the operator before publication.'
  },
  {
    category: 'EDITORIAL SAMPLE · DRAFT', title: 'Rest is something you can practise',
    dek: 'A possible theme for a future wellbeing story; not clinical advice.',
    art: 'rest',
    body: 'This is placeholder copy. It does not describe a treatment, service, health outcome or clinician. Replace it with fact-checked editorial content, and have health-related claims reviewed by an appropriately qualified professional.'
  },
];

export function JournalPage() {
  const root = useRef<HTMLDivElement>(null);
  const { mode } = useExperience();
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const storyCloseRef = useRef<HTMLButtonElement>(null);
  usePageReveal(root, mode);

  return (
    <main id="main-content" ref={root} className="inside-page journal-page">
      <section className="journal-hero">
        <div className="journal-hero-photo" aria-hidden="true"><Image src="/images/kumaoni-table.webp" alt="" fill priority sizes="100vw" quality={86} /></div>
        <span className="eyebrow"><span className="eyebrow-line" />EDITORIAL PREVIEW · SAMPLE COPY</span>
        <h1>Notes from<br /><em>up here.</em></h1>
        <p>Draft story ideas for review. Replace all sample copy and imagery with approved, fact-checked material before publication.</p>
        <div className="journal-hero-caption"><span>EDITORIAL PREVIEW</span><span>ILLUSTRATIVE IMAGE</span></div>
      </section>
      <section id="main-next" className="journal-listing section-pad">
        <div className="journal-listing-heading"><span>SAMPLE EDITORIAL DRAFTS</span><span>01 — 04&nbsp;&nbsp; · &nbsp;&nbsp;PREVIEW ONLY</span></div>
        <p className="preview-disclosure">These are layout placeholders, not articles about real staff, guests, services or operating practices. Replace and fact-check before launch.</p>
        <div className="journal-page-grid">
          {journalStories.map((story, index) => (
            <button className={`journal-entry journal-entry-${index + 1}`} key={story.title} onClick={() => setActiveStory(index)}>
              <span className="journal-art" aria-hidden="true"><Image src={journalImage(story.art)} alt="" fill sizes="(max-width: 760px) 90vw, 48vw" className="editorial-photo" /></span>
              <span className="journal-card-meta">{story.category}<MoveUpRight size={14} /></span>
              <span className="journal-card-title">{story.title}</span>
              <span className="journal-entry-dek">{story.dek}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="journal-subscribe section-pad">
        <span className="eyebrow"><span className="eyebrow-line" />OPTIONAL FUTURE UPDATES</span>
        <h2>A little quiet<br /><em>in your inbox.</em></h2>
        <p>This form sends an opt-in request to the configured recipient. It is not an active mailing list, and no marketing email is sent without confirmation.</p>
        <NewsletterForm />
      </section>
      <DialogPortal open={activeStory !== null} onClose={() => setActiveStory(null)} initialFocusRef={storyCloseRef}>
        {activeStory !== null && (
          <article className="story-reader" role="dialog" aria-modal="true" aria-labelledby="story-title">
            <button ref={storyCloseRef} className="focus-dismiss" onClick={() => setActiveStory(null)} aria-label="Close story"><X size={19} /></button>
            <div className="story-reader-art journal-art"><Image src={journalImage(journalStories[activeStory].art)} alt="" fill sizes="50vw" className="editorial-photo" /></div>
            <div className="story-reader-copy">
              <span className="eyebrow"><span className="eyebrow-line" />{journalStories[activeStory].category}</span>
              <h2 id="story-title">{journalStories[activeStory].title}</h2>
              <p className="story-reader-dek">{journalStories[activeStory].dek}</p>
              <p>{journalStories[activeStory].body}</p>
              <span className="story-reader-date">EDITORIAL PREVIEW · SAMPLE COPY</span>
            </div>
          </article>
        )}
      </DialogPortal>
    </main>
  );
}

function NewsletterForm() {
  const { status, error, fallbackHref, submit } = useEnquirySubmission();
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  if (status === 'success') {
    return <p ref={successRef} className="newsletter-success" role="status" tabIndex={-1}>Your request was accepted for delivery to the configured recipient. No newsletter emails will be sent until the operator confirms your subscription.</p>;
  }

  return (
    <form className="newsletter-form" onSubmit={(event) => submit(event, 'newsletter')} aria-busy={status === 'sending'}>
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Your email address" />
      <label className="newsletter-consent"><input type="checkbox" name="consent" value="true" required /><span>I agree to be contacted about seasonal letters. <Link href="/privacy">Privacy notice</Link>.</span></label>
      <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {error && <p className="form-error newsletter-error" role="alert">{error} {fallbackHref && <><a href={fallbackHref}>Email the operator to request a subscription</a>.</>}</p>}
      <button type="submit" aria-label="Request newsletter subscription" disabled={status === 'sending'}><ArrowRight size={17} /></button>
    </form>
  );
}

export function PageHero({
  label, title, description, note, treatment = false, image = '/images/kumaon-retreat.webp',
}: {
  label: string; title: React.ReactNode; description: string; note: string; treatment?: boolean; image?: string;
}) {
  return (
    <section className={`page-hero ${treatment ? 'page-hero-wellness' : ''}`}>
      <div className="page-hero-photo" aria-hidden="true">
        <Image src={image} alt="" fill sizes="100vw" quality={86} priority />
      </div>
      <div className="hero-backdrop" />
      <div className="page-hero-content">
        <span className="eyebrow"><span className="eyebrow-line" />{label}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <span className="page-hero-note"><span className="status-dot" />{note}</span>
        <span className="page-hero-disclosure">ILLUSTRATIVE CONCEPT IMAGE · NOT A VERIFIED PHOTOGRAPH</span>
      </div>
      <span className="page-hero-index">ARANYA&nbsp;&nbsp; / &nbsp;&nbsp;{treatment ? 'WELLNESS CLINIC' : 'HOTEL RESORT'}</span>
      <span className="page-hero-edge">KUMAON HIMALAYA · UTTARAKHAND, INDIA</span>
      <a href="#main-next" className="page-hero-scroll"><span>EXPLORE</span><ArrowDown size={13} /></a>
    </section>
  );
}

function usePageReveal(root: React.RefObject<HTMLDivElement | null>, mode: string) {
  const prefersReducedMotion = usePrefersReducedMotion();
  useGSAP(() => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.page-hero-content > *, .journal-hero > *',
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.12 },
    );
    gsap.utils.toArray<HTMLElement>('.inside-page [data-reveal], .care-row, .journal-entry').forEach((element) => {
      gsap.fromTo(element, { y: 30, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      });
    });
  }, { scope: root, dependencies: [mode, prefersReducedMotion], revertOnUpdate: true });
}
