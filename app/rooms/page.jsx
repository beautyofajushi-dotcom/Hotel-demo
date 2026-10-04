import Image from 'next/image';
import RoomExplorer from '@/components/RoomExplorer';

export const metadata = { title: 'Rooms & Suites' };

export default function RoomsPage() {
  return (
    <>
      <section className="page-hero page-hero-rooms">
        <div className="page-hero-copy">
          <p className="eyebrow eyebrow-light">ROOMS & SUITES · MIRAAN AGRA</p>
          <h1 className="display-title">A view worth<br /><em>waking for.</em></h1>
          <p>Find your own angle on Agra—from the first Taj silhouette at dawn to the quiet green of the inner gardens.</p>
          <a className="button-gold" href="#room-collection">Find your room <span className="button-arrow">↓</span></a>
        </div>
        <div className="page-hero-image" data-parallax><Image src="/images/miraan-taj-suite.webp" alt="The Taj View Suite with a softly lit arched window" fill priority sizes="(max-width: 800px) 100vw, 55vw" /><span>THE TAJ VIEW SUITE · 68 M²</span></div>
      </section>

      <section className="section-pad bg-ivory" id="room-collection">
        <div className="container-shell">
          <div className="section-heading" data-reveal><div><p className="eyebrow">A STAY, SHAPED AROUND YOU</p><h2>Choose your view.<br /><em>Make it yours.</em></h2></div><div className="section-aside !text-ink/60"><p>Filter by the view you came for and the bed configuration that suits your journey. Travelling with children or elders? We’ll help you choose.</p></div></div>
          <RoomExplorer />
        </div>
      </section>

      <section className="dark-band section-pad">
        <div className="container-shell relative z-[1] grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div data-reveal><p className="eyebrow eyebrow-light">THE DETAILS ARE ALREADY THOUGHT THROUGH</p><h2 className="font-display text-6xl leading-[.9] tracking-[-.05em] sm:text-7xl">Good nights<br /><em className="text-champagne">come naturally.</em></h2><p className="mt-6 max-w-sm text-[10px] leading-7 text-white/60">Every stay includes the practical comforts, the quiet touches and a host ready to help when you need one.</p></div>
          <div className="comfort-list" data-reveal><div><span>01</span><p><b>Thoughtful wake-up</b><small>Tea or coffee brought to your room, just the way you like it.</small></p></div><div><span>02</span><p><b>Family-friendly by design</b><small>Connecting room requests, child-friendly meals and extra help on arrival.</small></p></div><div><span>03</span><p><b>A local point of view</b><small>Our concierge can shape an Agra day around your interests and pace.</small></p></div><div><span>04</span><p><b>Easy arrival</b><small>Ask about airport, rail station and monument transfers before booking.</small></p></div></div>
        </div>
      </section>
      <section className="simple-cta"><div className="container-shell text-center" data-reveal><p className="eyebrow justify-center">WE’LL HELP YOU FIND THE RIGHT ROOM</p><h2>Start with a view.<br /><em>Stay for the feeling.</em></h2><a className="button-gold" href="/#top">Check your dates <span className="button-arrow">↗</span></a></div></section>
    </>
  );
}
