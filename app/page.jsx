import Image from 'next/image';
import Link from 'next/link';
import BookingBar from '@/components/BookingBar';

const heroVideo = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

export default function HomePage() {
  return (
    <>
      <section className="hero-home" id="top" aria-labelledby="home-title">
        <div className="hero-media" data-parallax>
          {heroVideo ? <video autoPlay muted loop playsInline poster="/images/miraan-agra-dusk.webp" src={heroVideo} data-hero-image aria-label="Agra hotel at blue hour" /> : <Image src="/images/miraan-agra-dusk.webp" alt="Mirāan Agra glowing beside the distant Taj Mahal at blue hour" fill priority sizes="100vw" data-hero-image />}
        </div>
        <div className="hero-vignette" />
        <div className="hero-copy container-shell">
          <p className="eyebrow eyebrow-light" data-reveal>TAJ GANJ · AGRA · INDIA</p>
          <h1 className="hero-title" id="home-title">
            <span className="line"><span data-mask-line>A closer view</span></span>
            <span className="line"><em data-mask-line>of wonder.</em></span>
          </h1>
          <p className="hero-lede" data-reveal>Stay in the city of marble, light and living craft. At Mirāan, the Taj is not just a view—it is the beginning of your Agra story.</p>
          <div data-reveal><Link className="button-gold" href="/rooms">Explore the hotel <span className="button-arrow">↗</span></Link></div>
        </div>
        <div className="hero-scroll"><b /> SCROLL TO DISCOVER</div>
        <span className="hero-place">27°10′ N · 78°02′ E</span>
        <span className="hero-index">01 / 05&nbsp;&nbsp; — &nbsp;&nbsp;THE CITY OF MARBLE</span>
      </section>

      <BookingBar />

      <section className="intro-section section-pad" id="the-hotel">
        <div className="container-shell intro-grid">
          <div data-reveal>
            <p className="eyebrow">DESIGNED FOR A DIFFERENT KIND OF ARRIVAL</p>
            <h2 className="intro-statement">Where history<br />meets <em>horizon.</em></h2>
          </div>
          <div data-reveal>
            <p className="intro-description">A modern Agra address with a sense of place. Carved stone, quiet gardens, thoughtful service and rooms that bring the city’s most extraordinary landmark a little closer.</p>
            <Link className="text-link" href="/experiences">Discover the Mirāan point of view <span>↗</span></Link>
            <div className="intro-stats">
              <div className="intro-stat"><strong data-count-to="03">03</strong><span>ROOM COLLECTIONS</span></div>
              <div className="intro-stat"><strong data-count-to="04">04</strong><span>GATHERING SPACES</span></div>
              <div className="intro-stat"><strong data-count-to="100" data-suffix="%">100%</strong><span>VEGETARIAN KITCHEN</span></div>
            </div>
          </div>
        </div>
        <div className="container-shell photo-grid mt-16" data-reveal>
          <figure data-parallax><Image src="/images/miraan-agra-city.webp" alt="A quiet Agra lane opening towards the Taj Mahal at sunrise" fill sizes="(max-width: 640px) 100vw, 60vw" /><figcaption className="photo-caption">AGRA · AN OLD CITY, STILL UNFOLDING</figcaption></figure>
          <figure data-parallax><Image src="/images/miraan-taj-suite.webp" alt="A Taj-facing suite at Mirāan Agra" fill sizes="(max-width: 640px) 80vw, 40vw" /><figcaption className="photo-caption">A ROOM WITH A VIEW</figcaption></figure>
        </div>
      </section>

      <section className="dark-band section-pad" aria-labelledby="rooms-title">
        <div className="container-shell relative z-[1]">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow eyebrow-light">STAY A LITTLE CLOSER</p><h2 id="rooms-title">A room for<br /><em>the view you came for.</em></h2></div>
            <div className="section-aside"><p>From private Taj vistas to quieter garden corners, choose a room that lets the city meet you at your own pace.</p><Link className="text-link text-link-light" href="/rooms">View rooms & suites <span>↗</span></Link></div>
          </div>
          <div className="room-preview-grid">
            <article className="room-preview-card" data-reveal>
              <Link className="room-preview-image" href="/rooms"><Image src="/images/miraan-taj-suite.webp" alt="Taj View Suite with a carved sandstone screen" fill sizes="(max-width: 640px) 100vw, 60vw" /><span className="room-image-tag">THE SIGNATURE VIEW · TAJ COLLECTION</span></Link>
              <div className="room-preview-info"><div><h3>Taj View Suite</h3><p>68 m² · King bed · Private sitting room</p></div><Link className="circle-link" href="/rooms" aria-label="Explore Taj View Suite">↗</Link></div>
            </article>
            <article className="room-preview-card" data-reveal>
              <Link className="room-preview-image" href="/rooms"><Image src="/images/miraan-heritage-suite.webp" alt="A Mughal Heritage Room with twin beds and jali details" fill sizes="(max-width: 640px) 100vw, 50vw" /><span className="room-image-tag">JAALI LIGHT · HERITAGE COLLECTION</span></Link>
              <div className="room-preview-info"><div><h3>Mughal Heritage Room</h3><p>46 m² · Twin or king · Courtyard view</p></div><Link className="circle-link" href="/rooms" aria-label="Explore Mughal Heritage Room">↗</Link></div>
            </article>
          </div>
        </div>
      </section>

      <section className="wedding-feature" aria-labelledby="wedding-title">
        <Image className="wedding-feature-image" src="/images/miraan-wedding-courtyard.webp" alt="A candlelit Mughal courtyard set for a destination wedding" fill sizes="100vw" />
        <div className="wedding-feature-overlay" />
        <div className="container-shell wedding-feature-content" data-reveal>
          <p className="eyebrow eyebrow-light">A CITY MADE FOR CELEBRATION</p>
          <h2 id="wedding-title">Your people.<br /><em>Your kind of magic.</em></h2>
          <p>Make room for every ritual, every toast and every story your families will tell for years. Our event team helps bring the whole celebration together.</p>
          <Link className="button-outline" href="/weddings">Plan a wedding at Mirāan <span className="button-arrow">↗</span></Link>
        </div>
        <span className="wedding-feature-caption">NOOR COURTYARD · MIRAAN AGRA</span>
      </section>

      <section className="section-pad bg-[#eee7da]">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1fr_.9fr] lg:gap-24">
          <div className="dining-image-wrap" data-reveal><Image src="/images/miraan-vegetarian-table.webp" alt="A fully vegetarian Mughlai-inspired meal served on a brass thali" fill sizes="(max-width: 900px) 100vw, 50vw" /><span className="dining-image-caption">THE MIRĀAN TABLE · PURE VEGETARIAN</span></div>
          <div data-reveal><p className="eyebrow">A TABLE WITH A POINT OF VIEW</p><h2 className="font-display mb-6 text-6xl leading-[.9] tracking-[-.05em] sm:text-7xl">Tradition,<br /><em className="text-champagne">reimagined.</em></h2><p className="body-copy">A considered take on Mughlai and North Indian cooking—entirely vegetarian, with clear Jain options and menus that move with the season.</p><div className="mb-7 mt-5 flex flex-wrap gap-4 text-[7px] font-extrabold tracking-[.12em] text-ink/60"><span className="inline-flex items-center gap-2"><i className="green-dot" /> PURE VEGETARIAN</span><span className="inline-flex items-center gap-2"><i className="green-dot jain-dot" /> JAIN ON REQUEST</span></div><Link className="text-link" href="/dining">Explore the dining room <span>↗</span></Link></div>
        </div>
      </section>

      <section className="dark-band section-pad" aria-labelledby="agra-title">
        <div className="container-shell relative z-[1]">
          <div className="section-heading" data-reveal><div><p className="eyebrow eyebrow-light">BEYOND THE MONUMENT</p><h2 id="agra-title">Let the city<br /><em>come into focus.</em></h2></div><div className="section-aside"><p>Follow a local thread through old lanes, craft ateliers and the quiet edges of the Yamuna.</p><Link className="text-link text-link-light" href="/experiences">Explore Agra with us <span>↗</span></Link></div></div>
          <div className="experience-rail" data-carousel>
            <article className="experience-card" data-reveal><Link className="experience-card-image" href="/experiences"><Image src="/images/miraan-agra-city.webp" alt="Agra's old lanes in soft morning light" fill sizes="(max-width: 640px) 85vw, 33vw" /><span>01</span></Link><p>THE OLD CITY · WITH A LOCAL</p><h3>Stories behind<br />the stone.</h3></article>
            <article className="experience-card" data-reveal><Link className="experience-card-image" href="/experiences"><Image src="/images/miraan-agra-dusk.webp" alt="The Taj Mahal across the Agra skyline at dusk" fill sizes="(max-width: 640px) 85vw, 33vw" /><span>02</span></Link><p>FIRST LIGHT · THE TAJ</p><h3>A quieter kind<br />of morning.</h3></article>
            <article className="experience-card" data-reveal><Link className="experience-card-image" href="/experiences"><Image src="/images/miraan-heritage-suite.webp" alt="Craft details inspired by Mughal jali screens" fill sizes="(max-width: 640px) 85vw, 33vw" /><span>03</span></Link><p>CRAFT · MADE BY HAND</p><h3>Meet the makers<br />of Agra.</h3></article>
          </div>
          <div className="rail-controls"><span>CURATED WITH OUR LOCAL HOSTS</span><div><button type="button" aria-label="Scroll experiences backward" data-carousel-prev>←</button><button type="button" aria-label="Scroll experiences forward" data-carousel-next>→</button></div></div>
        </div>
      </section>

      <section className="home-closing">
        <div className="home-closing-image" aria-hidden="true" />
        <div className="container-shell relative z-[1] text-center" data-reveal><p className="eyebrow eyebrow-light justify-center">THE CITY IS WAITING</p><h2>Arrive curious.<br /><em>Leave with a story.</em></h2><Link className="button-gold" href="/rooms">Begin your Agra stay <span className="button-arrow">↗</span></Link></div>
      </section>
    </>
  );
}
