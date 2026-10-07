import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <span className="eyebrow"><span className="eyebrow-line" />A QUIETER PATH</span>
      <p className="not-found-code">404</p>
      <h1>This page isn&apos;t<br /><em>on the map.</em></h1>
      <p>The address may have changed. Return to Aranya or choose a part of the house to explore.</p>
      <div className="not-found-links">
        <Link className="button button-primary" href="/">Return home</Link>
        <Link className="text-link" href="/contact">Contact the house</Link>
      </div>
    </main>
  );
}
