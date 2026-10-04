import Link from 'next/link';

const links = [
  { href: '/', label: 'The hotel' },
  { href: '/rooms', label: 'Rooms & suites' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/dining', label: 'Dining' },
  { href: '/experiences', label: 'The city' },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand-lockup" href="/" aria-label="Mirāan Agra home"><span className="brand-monogram" aria-hidden="true">M</span><span className="brand-title">MIRĀAN<small>THE TAJ · THE CITY · THE STAY</small></span></Link>
            <p>A design-led hotel concept in Agra, shaped by the light, craft and quiet grandeur of the city.</p>
          </div>
          <div><p className="footer-title">Discover</p><nav className="footer-links" aria-label="Footer navigation">{links.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav></div>
          <div className="footer-contact"><p className="footer-title">Find us</p><p>Taj Ganj · Agra<br />Uttar Pradesh, India</p><Link href="/experiences">Explore the neighbourhood ↗</Link></div>
          <div className="footer-contact"><p className="footer-title">Make it yours</p><p>Room for the Taj, a celebration or a table made around you.</p><Link href="/rooms">Start planning ↗</Link></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Mirāan Agra · Demo concept</span><span>27°10′ N · 78°02′ E</span><Link href="/#top">Back to the beginning ↑</Link></div>
      </div>
    </footer>
  );
}
