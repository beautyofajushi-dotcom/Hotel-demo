import Image from 'next/image';
import DiningMenu from '@/components/DiningMenu';
import ReserveButton from '@/components/ReserveButton';

export const metadata = { title: 'Dining' };

export default function DiningPage() {
  return (
    <>
      <section className="page-hero page-hero-dining">
        <div className="page-hero-copy">
          <p className="eyebrow eyebrow-light">THE TABLE AT MIRĀAN</p>
          <h1 className="display-title">A taste of Agra.<br /><em>Made for all.</em></h1>
          <p>Vegetarian Mughlai signatures, thoughtful Jain options and a dining room made for lingering.</p>
          <a className="button-gold" href="#the-menu">Explore the menu <span className="button-arrow">↓</span></a>
        </div>
        <div className="page-hero-image" data-parallax><Image src="/images/miraan-vegetarian-table.webp" alt="A vegetarian Mughlai-inspired thali at Mirāan Agra" fill priority sizes="(max-width: 800px) 100vw, 55vw" /><span>THE MIRĀAN TABLE · ALL VEGETARIAN</span></div>
      </section>

      <section className="section-pad bg-ivory">
        <div className="container-shell dining-intro">
          <div className="diet-seal" data-reveal><strong>100%</strong><span>PURE<br />VEGETARIAN</span></div>
          <div data-reveal><p className="eyebrow">A TABLE THAT WELCOMES EVERYONE</p><h2 className="font-display text-6xl leading-[.9] tracking-[-.05em] sm:text-7xl">The familiar,<br /><em className="text-champagne">made exceptional.</em></h2><p className="mt-6 max-w-xl text-[10px] leading-7 text-ink/60">Our kitchen looks to Agra’s culinary heritage and brings it to the table through a wholly vegetarian lens. Jain preparations are available on request; tell us what you need and we’ll plan with care.</p><div className="dietary-key"><span><i className="green-dot" /> Pure vegetarian</span><span><i className="green-dot jain-dot" /> Jain on request</span><span><i className="green-dot organic-dot" /> Seasonal</span></div></div>
        </div>
      </section>

      <section className="dark-band section-pad" id="the-menu"><div className="container-shell relative z-[1]"><div className="section-heading" data-reveal><div><p className="eyebrow eyebrow-light">AN OPEN INVITATION</p><h2>A menu with<br /><em>room for everyone.</em></h2></div><div className="section-aside"><p>Browse the menu by mood. Everything is vegetarian and marked for Jain and seasonal options.</p></div></div><DiningMenu /></div></section>

      <section className="section-pad bg-[#eee7da]"><div className="container-shell grid items-center gap-12 lg:grid-cols-[1fr_.95fr] lg:gap-24"><div data-reveal><p className="eyebrow">A TABLE OF YOUR OWN</p><h2 className="font-display text-6xl leading-[.9] tracking-[-.05em] sm:text-7xl">A quieter dinner.<br /><em className="text-champagne">A longer evening.</em></h2><p className="body-copy mt-6">Ask about a private dinner, a family thali or a Jain menu thoughtfully planned around your traditions.</p><ReserveButton request="Dining enquiry">Plan a dining experience</ReserveButton></div><div className="dining-image-wrap" data-reveal><Image src="/images/miraan-agra-dusk.webp" alt="A warm evening view of Mirāan Agra" fill sizes="(max-width: 900px) 100vw, 50vw" /><span className="dining-image-caption">EVENINGS, AT YOUR OWN PACE</span></div></div></section>
    </>
  );
}
