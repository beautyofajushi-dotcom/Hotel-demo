'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SpacesGallery } from './spaces-gallery';
import { useExperience } from './experience-context';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stories = [
  { category: 'SAMPLE STORY · DRAFT', title: 'The quiet science of a slower morning', art: 'morning' },
  { category: 'SAMPLE STORY · DRAFT', title: 'Learning to listen to the landscape', art: 'landscape' },
  { category: 'SAMPLE STORY · DRAFT', title: 'A table set by the seasons', art: 'table' },
];

function storyImage(art: string) {
  if (art === 'table') return '/images/kumaoni-table.webp';
  if (art === 'landscape') return '/images/himalayan-pool.webp';
  return '/images/kumaon-retreat.webp';
}

export function HomePage() {
  const root = useRef<HTMLDivElement>(null);
  const { mode, openBooking } = useExperience();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;
    gsap.fromTo('.hero-kicker, .hero-lede, .hero-actions, .hero-note',
      { y: 22, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.24 },
    );
    gsap.fromTo('.hero-line-inner',
      { yPercent: 115, rotate: 2 },
      { yPercent: 0, rotate: 0, duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.12 },
    );
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.fromTo(element,
        { y: 34, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        },
      );
    });
  }, { scope: root, dependencies: [mode, prefersReducedMotion], revertOnUpdate: true });

  return (
    <div ref={root}>
      <Hero />
      <section className="offer-clarity section-pad" aria-labelledby="offer-clarity-title">
        <div className="offer-clarity-heading" data-reveal>
          <span className="eyebrow"><span className="eyebrow-line" />ONE KUMAON DESTINATION · TWO CLEAR EXPERIENCES</span>
          <h2 id="offer-clarity-title">A Himalayan hotel resort,<br />with its own <em>wellness clinic.</em></h2>
        </div>
        <div className="offer-clarity-grid">
          <Link href="/stay" className="offer-panel offer-panel-resort" data-reveal>
            <Image src="/images/kumaon-retreat.webp" alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
            <span className="offer-panel-shade" />
            <span className="offer-panel-copy"><span>01 / HOTEL RESORT</span><strong>Stay in Kumaon.</strong><i>Ask about room types, rates & current facilities</i><b>Explore the resort <ArrowUpRight size={14} /></b></span>
          </Link>
          <Link href="/wellness" className="offer-panel offer-panel-clinic" data-reveal>
            <Image src="/images/ayurveda-ritual.webp" alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
            <span className="offer-panel-shade" />
            <span className="offer-panel-copy"><span>02 / WELLNESS CLINIC</span><strong>Begin with a question.</strong><i>Ask about services, providers & qualifications</i><b>Explore the clinic <ArrowUpRight size={14} /></b></span>
          </Link>
        </div>
        <p className="experience-footnote offer-disclosure">Images are illustrative concept visuals. Confirm actual room types, facilities, clinic services, providers and availability directly before planning.</p>
      </section>
      <section className="manifesto section-pad" id="the-house">
        <div className="manifesto-top">
          <span className="eyebrow" data-reveal><span className="eyebrow-line" />{mode === 'clinic' ? 'CARE, WITH A SENSE OF PLACE' : 'A DIFFERENT KIND OF HIMALAYAN HOTEL RESORT'}</span>
          <span className="manifesto-coordinate" data-reveal>KUMAON HIMALAYA<br />UTTARAKHAND · INDIA</span>
        </div>
        <div className="manifesto-grid">
          <h2 data-reveal>{mode === 'clinic' ? <>Wellbeing is<br />not a <em>quick fix.</em></> : <>The rarest luxury<br />is the room to <em>feel.</em></>}</h2>
          <div className="manifesto-copy" data-reveal>
            <span className="copy-index">A NOTE ON OUR WAY OF BEING</span>
            <p>{mode === 'clinic'
              ? 'Ask which services are currently offered, who provides them and what qualifications or scope apply. This enquiry page is not clinical advice and does not confirm an appointment.'
              : 'We believe a place can give something back. Time, perspective, the simple pleasure of not needing to be anywhere else. This is a Himalayan hotel resort made for that feeling.'}</p>
            <Link href={mode === 'clinic' ? '/wellness' : '/spaces'} className="text-link">{mode === 'clinic' ? 'Ask about clinic details' : 'Get to know the house'} <ArrowUpRight size={15} /></Link>
          </div>
        </div>
        <div className="manifesto-stats">
          <div data-reveal><span>01</span><b>{mode === 'clinic' ? 'Services to confirm' : 'Hotel resort experience'}</b></div>
          <div data-reveal><span>02</span><b>{mode === 'clinic' ? 'Provider credentials to confirm' : 'Kumaon setting'}</b></div>
          <div data-reveal><span>03</span><b>{mode === 'clinic' ? 'Appointment details on request' : 'Stay details to confirm'}</b></div>
        </div>
      </section>

      <section id="at-your-own-altitude" className="altitude-photo-only" aria-hidden="true">
        <Image src="/images/kumaon-retreat.webp" alt="" fill sizes="100vw" className="altitude-photo" />
      </section>

      <section className="spaces-section section-pad" id="spaces">
        <div className="section-heading">
          <div>
            <span className="eyebrow" data-reveal><span className="eyebrow-line" />{mode === 'clinic' ? 'A MORE CONSIDERED KIND OF CARE' : 'FIND YOUR OWN WAY HERE'}</span>
            <h2 data-reveal>{mode === 'clinic' ? <>Made for your<br /><em>next chapter.</em></> : <>A little more<br /><em>room to be.</em></>}</h2>
          </div>
          <div className="section-heading-side" data-reveal>
            <p>{mode === 'clinic'
              ? 'Ask which services are currently available and who provides them; confirm qualifications before proceeding.'
              : 'A hotel-resort enquiry page. Ask for verified room, facility, access and stay details before planning.'}</p>
            <Link href={mode === 'clinic' ? '/wellness' : '/spaces'} className="round-link" aria-label="Explore all spaces"><ArrowUpRight size={18} /></Link>
          </div>
        </div>
        <SpacesGallery compact />
        <div className="spaces-caption"><span>01 — 03</span><span>{mode === 'clinic' ? 'WELLNESS CLINIC' : 'HOTEL RESORT'}</span><span>KUMAON HIMALAYA, INDIA</span></div>
      </section>

      <section className="method-section section-pad">
        <div className="method-visual" data-reveal>
          <Image
            src={mode === 'clinic' ? '/images/ayurveda-ritual.webp' : '/images/kumaon-retreat.webp'}
            alt={mode === 'clinic' ? 'Illustrative wellness-clinic treatment room, not a verified view of the operating clinic' : 'Illustrative Himalayan resort concept image, not a verified property photograph'}
            fill
            sizes="(max-width: 760px) 100vw, 52vw"
            className="method-photo"
          />
        </div>
        <div className="method-copy" data-reveal>
          <span className="eyebrow"><span className="eyebrow-line" />{mode === 'clinic' ? 'WELLNESS CLINIC · DETAILS TO CONFIRM' : 'A MOMENT OF REST'}</span>
          <h2>{mode === 'clinic' ? <>Clear questions.<br /><em>Before care.</em></> : <>Nothing to prove.<br /><em>Nowhere to be.</em></>}</h2>
          <p>{mode === 'clinic'
            ? 'Ask which clinic services are currently offered, who provides them, how appointments work and which qualifications or scope apply.'
            : 'Ask the operator for current room, dining and facility details, accessibility information, rates and stay policies before planning.'}</p>
          <div className="method-steps">
            {(mode === 'clinic' ? ['Listen carefully', 'Understand deeply', 'Move forward'] : ['Arrive softly', 'Find your rhythm', 'Take it with you']).map((step, index) => (
              <div key={step}><span>0{index + 1}</span>{step}<ArrowRight size={14} /></div>
            ))}
          </div>
          <Link href={mode === 'clinic' ? '/wellness' : '/spaces'} className="text-link">{mode === 'clinic' ? 'Explore the clinic' : 'Explore the house'} <ArrowUpRight size={15} /></Link>
        </div>
      </section>

      <section className="journal-section section-pad">
        <div className="section-heading journal-heading">
          <div>
            <span className="eyebrow" data-reveal><span className="eyebrow-line" />THE ARANYA JOURNAL</span>
            <h2 data-reveal>Notes from<br /><em>up here.</em></h2>
          </div>
          <Link href="/journal" className="text-link" data-reveal>All stories <ArrowUpRight size={15} /></Link>
        </div>
        <p className="preview-disclosure">Story titles and images are editorial placeholders; replace with verified, approved content before launch.</p>
        <div className="journal-grid">
          {stories.map((story) => (
            <Link href="/journal" className="journal-card" key={story.title} data-reveal>
              <span className="journal-art" aria-hidden="true">
                <Image src={storyImage(story.art)} alt="" fill sizes="(max-width: 760px) 90vw, 30vw" className="editorial-photo" />
              </span>
              <span className="journal-card-meta">{story.category}<MoveUpRight size={14} /></span>
              <span className="journal-card-title">{story.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="closing-cta section-pad">
        <span className="eyebrow" data-reveal><span className="eyebrow-line" />A LITTLE SPACE, JUST FOR YOU</span>
        <h2 data-reveal>{mode === 'clinic' ? <>Your next chapter<br /><em>starts with a conversation.</em></> : <>There is a place<br /><em>for you up here.</em></>}</h2>
        <button className="button button-primary" onClick={() => openBooking({ mode, source: 'home-closing', interest: mode === 'clinic' ? 'general' : 'hotel-stay' })}>
          {mode === 'clinic' ? 'Ask about clinic details' : 'Ask about a stay'} <ArrowUpRight size={16} />
        </button>
        <span className="closing-cta-stamp">KUMAON<br />INDIA</span>
      </section>
    </div>
  );
}

function Hero() {
  const { mode, openBooking, playTick } = useExperience();
  const isClinic = mode === 'clinic';
  const lines = isClinic ? ['A more', 'human kind', 'of health.'] : ['Find your', 'own kind of', 'stillness.'];

  return (
    <section className={`hero hero-${mode}`}>
      <div className="hero-photo" aria-hidden="true">
        <Image
          key={mode}
          src={isClinic ? '/images/ayurveda-ritual.webp' : '/images/kumaon-retreat.webp'}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={88}
        />
      </div>
      <div className="hero-backdrop" />
      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="status-dot" />{isClinic ? 'WELLNESS CLINIC ENQUIRIES · KUMAON, INDIA' : 'HIMALAYAN HOTEL RESORT · KUMAON, INDIA'}</div>
          <h1 aria-label={lines.join(' ')}>
            {lines.map((line, index) => (
              <span className="hero-line" key={line}><span className="hero-line-inner">{index === lines.length - 1 ? <em>{line}</em> : line}</span></span>
            ))}
          </h1>
          <p className="hero-lede">{isClinic
            ? 'A distinct wellness-clinic enquiry experience, presented separately from the hotel resort. Ask about current services, providers and qualifications.'
            : 'A Himalayan hotel-resort enquiry experience shown in Kumaon. Confirm the operating address, rooms, facilities, rates and terms before planning.'}</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => { playTick(); openBooking({ mode, source: 'home-hero', interest: isClinic ? 'general' : 'hotel-stay' }); }}>
              {isClinic ? 'Begin a conversation' : 'Ask about a stay'} <ArrowUpRight size={15} />
            </button>
            <a className="hero-text-link" href="#spaces" onClick={playTick}>Discover Aranya <span><ArrowDown size={14} /></span></a>
          </div>
          <div className="hero-note"><span className="hero-note-rule" />ILLUSTRATIVE IMAGE · DETAILS TO CONFIRM</div>
        </div>
        <div className="hero-bottomline">
          <span>MADE OF MOUNTAIN AIR & QUIET INTENTION</span>
          <span><i /> KUMAON HIMALAYA · UTTARAKHAND, INDIA</span>
        </div>
      </div>
      <a className="hero-scroll-cue" href="#the-house" aria-label="Scroll to learn about Aranya"><span>SCROLL TO ARRIVE</span><span className="scroll-cue-line"><i /></span></a>
    </section>
  );
}
