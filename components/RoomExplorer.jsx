'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useBooking } from '@/components/BookingProvider';

const rooms = [
  { id: 'taj-view-suite', name: 'Taj View Suite', descriptor: 'A front-row view, framed in stone.', image: '/images/miraan-taj-suite.webp', view: 'taj', bed: 'king', area: '68 m²', guests: 3, rate: '₹28,000', badge: 'THE SIGNATURE VIEW', plan: 'taj' },
  { id: 'mughal-heritage-room', name: 'Mughal Heritage Room', descriptor: 'Jali shadows and thoughtful quiet.', image: '/images/miraan-heritage-suite.webp', view: 'heritage', bed: 'twin', area: '46 m²', guests: 2, rate: '₹18,000', badge: 'HERITAGE SIDE', plan: 'heritage' },
  { id: 'garden-premier-room', name: 'Garden Premier Room', descriptor: 'Soft light, a garden beyond the glass.', image: '/images/miraan-garden-room.webp', view: 'garden', bed: 'king', area: '52 m²', guests: 2, rate: '₹21,000', badge: 'GARDEN VIEW', plan: 'garden' },
  { id: 'family-residence', name: 'Family Residence', descriptor: 'Room for togetherness, with a little space apart.', image: '/images/miraan-family-residence.webp', view: 'heritage', bed: 'family', area: '82 m²', guests: 5, rate: '₹36,000', badge: 'FAMILY FAVOURITE', plan: 'family' },
];

function Floorplan({ room, onClose }) {
  if (!room) return null;
  return (
    <div className="floorplan-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="floorplan-panel" role="dialog" aria-modal="true" aria-labelledby="floorplan-title" data-lenis-prevent>
        <button className="dialog-close" type="button" aria-label="Close floorplan" onClick={onClose}>×</button>
        <p className="eyebrow">ROOM DETAILS · {room.area}</p>
        <h2 id="floorplan-title">{room.name}</h2>
        <p>An illustrative room layout. Exact furniture placement may vary by room.</p>
        <div className={`floorplan-drawing ${room.plan === 'family' ? 'floorplan-family' : ''}`}>
          <div className="plan-room plan-room--entry">ENTRY</div>
          <div className="plan-room plan-room--bed">{room.plan === 'family' ? 'KING BEDROOM' : 'SLEEPING AREA'}</div>
          <div className="plan-room plan-room--living">{room.plan === 'family' ? 'TWIN ALCOVE' : 'SITTING'}</div>
          <div className="plan-room plan-room--bath">BATH & DRESSING</div>
          <div className="plan-room plan-room--view">{room.view === 'taj' ? 'TAJ VIEW' : room.view === 'garden' ? 'GARDEN VIEW' : 'JALI WINDOW'}</div>
        </div>
        <p className="floorplan-foot">Illustrative plan only · Ask our team about access, adjoining rooms and specific requirements.</p>
      </section>
    </div>
  );
}

export default function RoomExplorer() {
  const { openBooking } = useBooking();
  const [view, setView] = useState('all');
  const [bed, setBed] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const filteredRooms = useMemo(() => rooms.filter((room) => (view === 'all' || room.view === view) && (bed === 'all' || room.bed === bed)), [view, bed]);

  return (
    <>
      <div className="room-filters mb-7 flex flex-wrap items-end gap-4 border-y border-ink/15 py-4" data-reveal>
        <label className="filter-label">VIEW<select value={view} onChange={(event) => setView(event.target.value)}><option value="all">All views</option><option value="taj">Taj Mahal</option><option value="garden">Garden</option><option value="heritage">Heritage</option></select></label>
        <label className="filter-label">BED CONFIGURATION<select value={bed} onChange={(event) => setBed(event.target.value)}><option value="all">All beds</option><option value="king">King</option><option value="twin">Twin</option><option value="family">Family</option></select></label>
        <p className="ml-auto mb-1 text-[9px] text-ink/55" aria-live="polite">Showing {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'}</p>
      </div>
      {filteredRooms.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map((room, index) => (
            <article className="room-card" key={room.id} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <div className="room-card-media"><Image src={room.image} alt={`${room.name} at Mirāan Agra`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>{room.badge}</span></div>
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-start justify-between gap-3"><div><p className="eyebrow mb-2">{room.view === 'taj' ? 'THE TAJ COLLECTION' : room.view === 'garden' ? 'GARDEN COLLECTION' : 'HERITAGE COLLECTION'}</p><h3 className="font-display text-[29px] leading-none">{room.name}</h3></div><span className="mt-1 text-[8px] text-ink/50">{room.area}</span></div>
                <p className="mb-4 min-h-10 text-[9px] leading-6 text-ink/60">{room.descriptor}</p>
                <div className="mb-5 flex flex-wrap gap-2">{[`${room.guests} guests`, room.bed === 'family' ? 'King + twin nook' : `${room.bed} bed`, room.view === 'taj' ? 'Taj Mahal view' : `${room.view} view`].map((feature) => <span className="room-chip" key={feature}>{feature}</span>)}</div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-4"><button className="text-link" type="button" onClick={() => setSelectedRoom(room)}>View floorplan <span>↗</span></button><strong className="text-[10px]">From {room.rate}<small className="ml-1 font-normal text-ink/50">/ night</small></strong></div>
                <button className="button-gold mt-5 w-full" type="button" onClick={() => openBooking({ request: room.name, guests: room.guests })}>Enquire about this room <span className="button-arrow">↗</span></button>
              </div>
            </article>
          ))}
        </div>
      ) : <div className="border border-ink/15 p-8 text-center text-[10px] text-ink/55">No rooms match these filters. Try another view or bed.</div>}
      <p className="mt-5 text-[7px] leading-5 text-ink/45">Rates are illustrative demo prices in INR, before taxes. Room inventory and views must be verified by the hotel before launch.</p>
      <Floorplan room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </>
  );
}
