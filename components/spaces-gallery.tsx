'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, MoveUpRight, X } from 'lucide-react';
import { useExperience, type ExperienceMode } from './experience-context';
import { DialogPortal } from './dialog-portal';

export type SpaceItem = {
  number: string;
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  art: 'suite' | 'water' | 'ridge';
  size: 'wide' | 'tall' | 'short';
  metric: string;
};

const resortSpaces: SpaceItem[] = [
  {
    number: '01',
    eyebrow: 'HOTEL RESORT · DETAILS TO CONFIRM',
    title: 'Room to make your own.',
    summary: 'Ask about current room types, access and stay details.',
    detail: 'Room count, layouts, views, amenities and accessibility have not been verified in this preview. Ask for current details, rates, availability, arrival guidance and cancellation terms before planning.',
    art: 'suite',
    size: 'wide',
    metric: 'Room and stay facts to confirm',
  },
  {
    number: '02',
    eyebrow: 'FACILITIES · ASK THE OPERATOR',
    title: 'A pause in your day.',
    summary: 'Ask which shared facilities are currently available.',
    detail: 'The pool image is illustrative and does not confirm that a pool or any pictured facility is available at the property. Ask about current facilities, opening times, accessibility and any fees.',
    art: 'water',
    size: 'tall',
    metric: 'Facilities and access to confirm',
  },
  {
    number: '03',
    eyebrow: 'LOCAL AREA · ASK THE OPERATOR',
    title: 'Find your own pace.',
    summary: 'Ask about current outdoor options and routes.',
    detail: 'Any nearby paths, guides or outdoor activities should be confirmed with the operator. Ask about current availability, route difficulty, season, transport and accessibility before setting out.',
    art: 'ridge',
    size: 'short',
    metric: 'Route and season details to confirm',
  },
];

const clinicSpaces: SpaceItem[] = [
  {
    number: '01',
    eyebrow: 'SERVICES · DETAILS TO CONFIRM',
    title: 'Start with questions.',
    summary: 'Ask what services and appointments are currently offered.',
    detail: 'This preview does not verify any particular treatment, assessment or health service. Request the current service list, intended outcomes, risks, alternatives, fees and availability before deciding whether to proceed.',
    art: 'suite',
    size: 'wide',
    metric: 'Service scope to confirm',
  },
  {
    number: '02',
    eyebrow: 'PROVIDERS · DETAILS TO CONFIRM',
    title: 'Know who provides care.',
    summary: 'Request names, qualifications and scope of practice.',
    detail: 'No individual clinician or credential is verified on this page. Before booking, request the provider’s full name, qualifications, registration status where applicable, scope of practice and the person responsible for clinical decisions.',
    art: 'water',
    size: 'tall',
    metric: 'Provider details in writing',
  },
  {
    number: '03',
    eyebrow: 'PRACTICAL DETAILS · ASK THE CLINIC',
    title: 'Plan with clarity.',
    summary: 'Ask about fees, records, access and appointment timing.',
    detail: 'An online enquiry is not an appointment, diagnosis or medical recommendation. Confirm the clinic’s privacy process, fees, cancellation terms, accessibility and how to reach a qualified local provider if your needs are urgent.',
    art: 'ridge',
    size: 'short',
    metric: 'Appointment details to confirm',
  },
];

export function getSpaceItems(mode: ExperienceMode) {
  return mode === 'clinic' ? clinicSpaces : resortSpaces;
}

export function SpacesGallery({ compact = false }: { compact?: boolean }) {
  const { mode, playTick, openBooking } = useExperience();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const spaces = getSpaceItems(mode);

  const activeSpace = selectedIndex === null ? null : spaces[selectedIndex];
  const activeImage = activeSpace?.art === 'water'
    ? '/images/himalayan-pool.webp'
    : mode === 'clinic' && activeSpace?.art === 'suite'
      ? '/images/ayurveda-ritual.webp'
      : '/images/kumaon-retreat.webp';

  return (
    <>
      <div className={`spaces-grid ${compact ? 'spaces-grid-compact' : ''}`}>
        {spaces.map((space, index) => (
          <button
            className={`space-card space-card-${space.size}`}
            key={`${mode}-${space.number}`}
            onClick={() => { playTick(); setSelectedIndex(index); }}
            data-reveal
            aria-label={`Explore ${space.title}`}
          >
            <SpaceArtwork art={space.art} mode={mode} />
            <span className="space-card-top"><span>{space.number} / {space.eyebrow}</span><MoveUpRight size={17} strokeWidth={1.3} /></span>
            <span className="space-card-bottom">
              <span className="space-card-category">{mode === 'clinic' ? ['ASSESS', 'RESTORE', 'LONGEVITY'][index] : ['STAY', 'RESTORE', 'EXPLORE'][index]}</span>
              <span className="space-card-title">{space.title}</span>
              {!compact && <span className="space-card-summary">{space.summary}</span>}
            </span>
            <span className="sr-only">Open details</span>
          </button>
        ))}
      </div>

      <DialogPortal open={activeSpace !== null} onClose={() => setSelectedIndex(null)} initialFocusRef={closeButtonRef}>
        {activeSpace && selectedIndex !== null && (
          <div className="space-focus" role="dialog" aria-modal="true" aria-labelledby="space-focus-title">
            <button ref={closeButtonRef} className="focus-dismiss" aria-label="Close details" onClick={() => setSelectedIndex(null)}><X size={19} /></button>
            <div className="focus-photo" aria-hidden="true"><Image src={activeImage} alt="" fill sizes="100vw" /></div>
            <div className="focus-photo-wash" />
            <div className="focus-content">
              <span className="eyebrow"><span className="eyebrow-line" /> {activeSpace.number} / {activeSpace.eyebrow}</span>
              <h2 id="space-focus-title">{activeSpace.title}</h2>
              <p>{activeSpace.detail}</p>
              <div className="focus-metric"><span className="focus-metric-dot" />{activeSpace.metric}</div>
              <button className="button button-primary focus-cta" onClick={() => { setSelectedIndex(null); openBooking({ mode, source: 'space-detail', interest: mode === 'clinic' ? 'general' : 'hotel-stay' }); }}>
                {mode === 'clinic' ? 'Send a clinic enquiry' : 'Ask about a stay'} <ArrowUpRight size={15} />
              </button>
            </div>
            <div className="focus-index">{String(selectedIndex + 1).padStart(2, '0')} <span>/ 03</span></div>
            <button className="focus-prev" onClick={() => setSelectedIndex((selectedIndex - 1 + spaces.length) % spaces.length)} aria-label="Previous space">
              <ArrowDownRight size={16} /> Previous
            </button>
            <button className="focus-next" onClick={() => setSelectedIndex((selectedIndex + 1) % spaces.length)} aria-label="Next space">
              Next <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </DialogPortal>
    </>
  );
}

function SpaceArtwork({ art, mode }: { art: SpaceItem['art']; mode: ExperienceMode }) {
  const image = art === 'water'
    ? '/images/himalayan-pool.webp'
    : mode === 'clinic' && art === 'suite'
      ? '/images/ayurveda-ritual.webp'
      : '/images/kumaon-retreat.webp';

  return (
    <span className="space-art" aria-hidden="true">
      <Image src={image} alt="" fill sizes="(max-width: 760px) 92vw, 52vw" className="space-art-photo" />
    </span>
  );
}
