import Image from 'next/image';
import WeddingCalculator from '@/components/WeddingCalculator';

export const metadata = { title: 'Weddings & Celebrations' };

export default function WeddingsPage() {
  return (
    <>
      <section className="feature-hero" aria-labelledby="wedding-page-title">
        <Image src="/images/miraan-wedding-courtyard.webp" alt="A candlelit Mughal courtyard prepared for an Agra destination wedding" fill priority sizes="100vw" />
        <div className="feature-hero-content container-shell" data-reveal>
          <p className="eyebrow eyebrow-light">WEDDINGS & CELEBRATIONS · AGRA</p>
          <h1 id="wedding-page-title">The beginning<br /><em>of your forever.</em></h1>
          <p>Let the city of love set the scene. We’ll make space for every ritual, every guest and every moment in between.</p>
          <a className="button-gold" href="#celebration-planner">Plan your celebration <span className="button-arrow">↓</span></a>
        </div>
        <span className="hero-index">A DESTINATION WEDDING, MADE PERSONAL</span>
      </section>

      <section className="section-pad bg-ivory">
        <div className="container-shell grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          <p className="eyebrow" data-reveal>THE DAYS THAT BECOME FAMILY STORIES</p>
          <div data-reveal><h2 className="font-display text-6xl leading-[.91] tracking-[-.05em] sm:text-7xl">One address.<br /><em className="text-champagne">A thousand memories.</em></h2><p className="mt-6 max-w-2xl text-[11px] leading-7 text-ink/60">Mehendi under the jali, a sangeet that spills into the night, pheras in a candlelit courtyard and a reception the whole family can share. Mirāan brings the spaces, the service and the details together.</p><div className="mt-8 flex flex-wrap gap-x-9 gap-y-4 border-t border-ink/15 pt-5 text-[7px] font-extrabold tracking-[.14em] text-ink/55"><span>CURATED CEREMONIES</span><span>DEDICATED EVENT TEAM</span><span>VEGETARIAN MENUS</span><span>ROOM BLOCKS</span></div></div>
        </div>
      </section>

      <section className="section-pad bg-[#e9e1d4]" id="celebration-planner">
        <div className="container-shell">
          <div className="section-heading" data-reveal><div><p className="eyebrow">A FIRST STEP, NOT A FLOOR PLAN</p><h2>How many people<br /><em>are you bringing?</em></h2></div><div className="section-aside !text-ink/60"><p>Move the guest count and we’ll show a suggested first fit. Our event team will adapt it to your ceremony, dining and dance-floor plans.</p></div></div>
          <WeddingCalculator />
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <div className="container-shell">
          <div className="section-heading" data-reveal><div><p className="eyebrow">A CELEBRATION IN CHAPTERS</p><h2>Make the in-between<br /><em>moments matter.</em></h2></div><div className="section-aside !text-ink/60"><p>From a first family dinner to the final farewell, plan a few days your guests will remember as much as the ceremony.</p></div></div>
          <div className="wedding-gallery"><figure data-reveal><Image src="/images/miraan-wedding-courtyard.webp" alt="An elegant wedding mandap in a heritage courtyard" fill sizes="(max-width: 620px) 84vw, 55vw" /><figcaption><span>01</span><span>MEHENDI & PHERAS</span></figcaption></figure><figure data-reveal><Image src="/images/miraan-agra-dusk.webp" alt="The Taj Mahal glowing beyond Agra at dusk" fill sizes="(max-width: 620px) 84vw, 40vw" /><figcaption><span>02</span><span>A CITY-WIDE BACKDROP</span></figcaption></figure><figure data-reveal><Image src="/images/miraan-vegetarian-table.webp" alt="A lavish vegetarian meal for a wedding celebration" fill sizes="(max-width: 620px) 84vw, 40vw" /><figcaption><span>03</span><span>A TABLE FOR EVERYONE</span></figcaption></figure></div>
        </div>
      </section>

    </>
  );
}
