import Image from 'next/image';
import Link from 'next/link';
import ReserveButton from '@/components/ReserveButton';

export const metadata = { title: 'Agra Experiences' };

const experiences = [
  { number: '01', title: 'The Taj at first light', tag: 'DAWN · PRIVATE GUIDE', copy: 'Meet the monument while the marble is still cool and the day is only beginning. Your host can help arrange a thoughtful early visit.', image: '/images/miraan-agra-dusk.webp', alt: 'The Taj Mahal appearing on the Agra horizon at blue hour', request: 'Agra city experience' },
  { number: '02', title: 'A city of makers', tag: 'CRAFT · BY ARRANGEMENT', copy: 'Step into a marble-inlay workshop and see how a patient hand turns stone into something luminous.', image: '/images/miraan-agra-city.webp', alt: 'An Agra artisan lane with old red sandstone buildings', request: 'Agra city experience' },
  { number: '03', title: 'The old city, slowly', tag: 'WALK · LOCAL HOST', copy: 'Follow the lanes beyond the postcard: old gateways, local markets, hidden courtyards and the stories in between.', image: '/images/miraan-agra-city.webp', alt: 'A quiet old city lane in Agra with a bicycle', request: 'Agra city experience' },
];

export default function ExperiencesPage() {
  return (
    <>
      <section className="page-hero page-hero-experiences">
        <div className="page-hero-copy"><p className="eyebrow eyebrow-light">BEYOND THE TAJ</p><h1 className="display-title">Meet Agra<br /><em>at your own pace.</em></h1><p>Look a little closer. The best discoveries are often just beyond the familiar frame.</p><a className="button-gold" href="#city-experiences">Explore the city <span className="button-arrow">↓</span></a></div>
        <div className="page-hero-image" data-parallax><Image src="/images/miraan-agra-city.webp" alt="An old Agra street opens towards the Taj Mahal in the morning" fill priority sizes="(max-width: 800px) 100vw, 55vw" /><span>AGRA · EARLY MORNING</span></div>
      </section>

      <section className="section-pad bg-ivory" id="city-experiences"><div className="container-shell"><div className="section-heading" data-reveal><div><p className="eyebrow">A CITY WITH MORE THAN ONE STORY</p><h2>Follow the light.<br /><em>See what opens.</em></h2></div><div className="section-aside !text-ink/60"><p>Our concierge can help you make a day around your interests—art, architecture, food, family time or simply a slower look at Agra.</p></div></div><div className="city-card-grid">{experiences.map((item) => <article className="city-card" key={item.number} data-reveal><div className="city-card-photo"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 620px) 100vw, 33vw" /></div><div className="city-card-body"><p className="eyebrow">{item.tag}</p><h3>{item.title}</h3><p>{item.copy}</p><ReserveButton request={item.request} className="text-link">Ask our concierge <span>↗</span></ReserveButton></div></article>)}</div></div></section>

      <section className="dark-band section-pad"><div className="container-shell relative z-[1] grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div data-reveal><p className="eyebrow eyebrow-light">ONE DAY, LOOSELY HELD</p><h2 className="font-display text-6xl leading-[.9] tracking-[-.05em] sm:text-7xl">See the city.<br /><em className="text-champagne">Keep your space.</em></h2><p className="mt-6 max-w-sm text-[10px] leading-7 text-white/60">A gentle itinerary is just a suggestion. Leave room for a longer lunch, a return to the room or one more look at the Taj.</p></div><div className="day-timeline" data-reveal><div><span>06:00</span><p><b>Meet the morning</b><small>Start with the Taj as the first light reaches the marble.</small></p></div><div><span>09:00</span><p><b>Come back for breakfast</b><small>Take your time at the table and leave the rest of the morning open.</small></p></div><div><span>15:00</span><p><b>Find a maker</b><small>Step into a local atelier or follow a host through the old city lanes.</small></p></div><div><span>19:00</span><p><b>Let the evening settle</b><small>A vegetarian dinner, a terrace view, nowhere else to be.</small></p></div></div></div></section>

      <section className="simple-cta"><div className="container-shell text-center" data-reveal><p className="eyebrow justify-center">LET US HELP YOU FIND YOUR AGRA</p><h2>Start with a place.<br /><em>Take home a feeling.</em></h2><Link className="button-gold" href="/rooms">Plan your stay <span className="button-arrow">↗</span></Link></div></section>
    </>
  );
}
